package com.waterfilter.water.department;

import org.springframework.stereotype.Service;

@Service
public class DepartmentMapper {

  public DepartmentResponse toDepartmentResponse(Department department){
    return DepartmentResponse.builder()
        .id(department.getDepartmentId())
        .branchId(department.getBranch().getId())
        .name(department.getName())
        .build();
  }
}
