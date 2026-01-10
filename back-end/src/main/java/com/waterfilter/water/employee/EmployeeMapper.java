package com.waterfilter.water.employee;

import java.time.LocalDate;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeMapper {

    private final PasswordEncoder passwordEncoder;
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
                .branchId(employee.getEmployeeBranch() != null ? employee.getEmployeeBranch().getId() : null)
                .departmentId(employee.getDepartment() != null ? employee.getDepartment().getDepartmentId() : null)
                // insurance
                .build();
    }

    public Employee toEntity(EmployeeRequest employeeRequest){
         Employee employee = Employee.builder()
        .hireDate(LocalDate.now())
        .build();

        employee.setFirstName(employeeRequest.getFirstName());
        employee.setMiddleName(employeeRequest.getMiddleName());
        employee.setLastName(employeeRequest.getLastName());
        employee.setUsername(employeeRequest.getUsername());
        employee.setEmail(employeeRequest.getEmail());
        employee.setPhoneNumber(employeeRequest.getPhoneNumber());
        employee.setPassword(passwordEncoder.encode(employeeRequest.getPassword()));
        employee.setUserRole(employeeRequest.getRole());
        employee.setUserType(employeeRequest.getType());

        return employee;
    }
}
