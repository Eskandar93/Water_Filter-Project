package com.waterfilter.water.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.waterfilter.water.exception.ResourceNotFoundException;

@Service
public class MyUserDetailsService implements UserDetailsService {


    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        Users user = userRepository.findByIdentifier(identifier)
        .orElseThrow(()-> new ResourceNotFoundException("User : " + identifier + " not exist"));

        return new UserPrincipal(user);
    }
}
