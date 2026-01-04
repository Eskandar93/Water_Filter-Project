package com.waterfilter.water.user;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

  private String token;
    private String tokenType;
    private Long userId;
    private String username;
    private List<String> roles;
    private Integer expiresIn; 
    private LocalDateTime lastLogin;
}
