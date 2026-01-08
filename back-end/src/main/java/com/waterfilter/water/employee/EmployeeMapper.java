package com.waterfilter.water.employee;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeMapper {

    public EmployeeResponse toEmployeeResponse(Employee employee) {
        return EmployeeResponse.builder()
                .id(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .username(employee.getUsername())
                .phoneNumber(employee.getPhoneNumber())
                .employeeCode(employee.getEmployeeCode())
                .hireDate(employee.getHireDate())
                .salary(employee.getSalary())
                .role(employee.getUserRole())
                .type(employee.getUserType())
                .departmentId(employee.getDepartment() != null ? employee.getDepartment().getDepartmentId() : null)
                .branchId(employee.getEmployeeBranch() != null ? employee.getEmployeeBranch().getBranchId() : null)
                // department
                // insurance
                .build();
    }

    public Employee toEntity(EmployeeRequest employeeRequest){
         Employee emploee = Employee.builder()
        .hireDate(LocalDate.now())
        .build();

        emploee.setFirstName(employeeRequest.getFirstName());
        emploee.setMiddleName(employeeRequest.getMiddleName());
        emploee.setLastName(employeeRequest.getLastName());
        emploee.setUsername(employeeRequest.getUsername());
        emploee.setEmail(employeeRequest.getEmail());
        emploee.setPhoneNumber(employeeRequest.getPhoneNumber());
        emploee.setUserRole(employeeRequest.getRole());
        emploee.setUserType(employeeRequest.getType());

        return emploee;
    }
}
