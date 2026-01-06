package com.waterfilter.water.user;


import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.waterfilter.water.config.security.JwtService;
import com.waterfilter.water.employee.Employee;
import com.waterfilter.water.employee.EmployeeRepository;
import com.waterfilter.water.exception.BusinessException;
import com.waterfilter.water.exception.DublicateResourceException;
import com.waterfilter.water.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final EmployeeRepository employeeRepository;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final UserMapper userMapper;
  // register
  public UserResponse register(UserRequest request){

    if(userRepository.findByEmail(request.getEmail()).isPresent()){
      throw new DublicateResourceException("User with email: "+ request.getEmail() +" is already exist");
    }

    if(userRepository.findByUsername(request.getUsername()).isPresent()){
      throw new DublicateResourceException("User with username: "+ request.getUsername() +" is already exist");
    }

    Employee user = new Employee();
    user.setUsername(request.getUsername());
    user.setEmail(request.getEmail());
    // encode password
    user.setPassword(passwordEncoder.encode(request.getPassword()));

    userRepository.save(user);
    return userMapper.toResponse(user);
  }
  // login
  public LoginResponse login(UserLoginRequest request){

    try{
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        request.getIdentifier(), 
        request.getPassword())
      );

      if(authentication.isAuthenticated()){

      UserDetails userDetails  = (UserDetails) authentication.getPrincipal();
      Long currId = extractUserIdFromUserDetails(userDetails);
      updateEmployeeLastLogin(currId);

        String token = jwtService.generateToken(userDetails);
        return LoginResponse.builder()
                  .token(token)
                  .tokenType("Bearer")
                  .username(userDetails.getUsername())
                  .userId(currId)
                  .roles(extractRolesFromUserDetails(userDetails))
                  .expiresIn(6 * 60 * 60)
                  .lastLogin(LocalDateTime.now())
                  .build();
      }
    }catch(BadCredentialsException e){
      throw new ResourceNotFoundException("Invalid username or password");
    }

      throw new BusinessException("Authentication failed");
  }

    private Long extractUserIdFromUserDetails(UserDetails userDetails){

        if(userDetails instanceof UserPrincipal user){
          return user.getUser().getId();
        }

        if(userDetails instanceof Users || userDetails instanceof Employee ){

            Users user = (Users) userDetails;
            return user.getId();
        }

    return null;
  }

  private List<String> extractRolesFromUserDetails(UserDetails userDetails){
    return userDetails.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.toList());
  }

  @Transactional
  private void updateEmployeeLastLogin(Long employeeId) {
    Employee employee = employeeRepository.findById(employeeId)
        .orElseThrow(() -> new ResourceNotFoundException("Employee with id: " + employeeId + " not exist"));

    employee.setLastLogin(LocalDateTime.now());
    employeeRepository.save(employee);
  }
}
