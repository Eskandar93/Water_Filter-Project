package com.waterfilter.water.department;

import org.springframework.stereotype.Service;

@Service
public class DepartmentMapper {

  public DepartmentResponse toDepartmentResponse(Department department){
    return DepartmentResponse.builder()
        .departmentId(department.getDepartmentId())
        .branchId(department.getBranch().getBranchId())
        .name(department.getName())
        .build();
  }
}
