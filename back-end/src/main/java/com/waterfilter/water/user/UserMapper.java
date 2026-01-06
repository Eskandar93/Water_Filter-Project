package com.waterfilter.water.user;

import org.springframework.stereotype.Service;

@Service
public class UserMapper {

  public UserResponse toResponse(Users user){
    UserResponse userResponse = new UserResponse();
    userResponse.setId(user.getId());
    userResponse.setUsername(user.getUsername());
    userResponse.setEmail(user.getEmail());
    
    return userResponse;
  }
}
