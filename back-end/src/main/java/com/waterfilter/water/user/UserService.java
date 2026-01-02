package com.waterfilter.water.user;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.waterfilter.water.config.security.JwtService;
import com.waterfilter.water.employee.Employee;
import com.waterfilter.water.exception.DublicateResourceException;
import com.waterfilter.water.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  // register
  public void register(UserRequest request){

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
  }
  // login
  public String verifyUser(UserLoginRequest request){

    try{
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        request.getIdentifier(), 
        request.getPassword())
      );

      if(authentication.isAuthenticated()){
        String username = authentication.getName();
        // UserDetails userDetails  = (UserDetails) authentication.getPrincipal();
        return jwtService.generateToken(username);
      }
    }catch(BadCredentialsException e){
      throw new ResourceNotFoundException("Invalid username or password");
    }catch(org.springframework.security.core.AuthenticationException  e){
      throw new ResourceNotFoundException("Authentication failed: " + e.getMessage());
    }

      return "Failuer";
  }

}
