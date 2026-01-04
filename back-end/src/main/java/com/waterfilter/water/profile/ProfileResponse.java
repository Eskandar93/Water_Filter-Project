package com.waterfilter.water.profile;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.waterfilter.water.user.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {

   private Long userId;
    private String username;
    private String email;
    private String fullName;
    private UserRole role;
    private Long branchId;
    private String branchName;
    private Long departmentId;
    private String departmentName;
    private LocalDate hireDate;
    private LocalDateTime lastLogin;
    private boolean isActive;
}
