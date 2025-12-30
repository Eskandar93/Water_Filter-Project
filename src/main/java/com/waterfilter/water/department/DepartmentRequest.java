package com.waterfilter.water.department;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentRequest {

    private Long departmentId;
    private String name;
    private Long branchId;

}
