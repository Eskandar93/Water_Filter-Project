package com.waterfilter.water.profile;

import org.springframework.stereotype.Service;

import com.waterfilter.water.employee.Employee;

@Service
public class ProfileMapper {

  public ProfileResponse toProfileResponse(Employee employee){
    return ProfileResponse.builder()
        .userId(employee.getId())
        .username(employee.getUsername())
        .email(employee.getEmail())
        .fullName(employee.getFirstName() + " " + employee.getLastName())
        .role(employee.getUserRole())
        .branchId(employee.getEmployeeBranch().getBranchId())
        .branchName(employee.getEmployeeBranch().getName())
        .departmentId(employee.getDepartment().getDepartmentId())
        .departmentName(employee.getDepartment().getName())
        .hireDate(employee.getHireDate())
        .lastLogin(employee.getLastLogin())
        .isActive(employee.isActive())
    .build();
  }
}
