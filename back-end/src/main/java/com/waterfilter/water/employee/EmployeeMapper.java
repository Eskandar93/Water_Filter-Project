package com.waterfilter.water.employee;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.waterfilter.water.insurance.InsuranceMapper;
import com.waterfilter.water.insurance.InsuranceType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeMapper {

    private final PasswordEncoder passwordEncoder;
    private final InsuranceMapper insuranceMapper;
    public EmployeeResponse toEmployeeResponse(Employee employee) {

        List<InsuranceType> insurancesTypes = insuranceMapper.toInsuranceTypeList(employee.getInsurances());
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
                .departmentName(employee.getDepartment() != null ? employee.getDepartment().getName() : null)
                .branchName(employee.getEmployeeBranch() != null ? employee.getEmployeeBranch().getName() : null)
                .insurances(employee.getInsurances() != null ? insurancesTypes : null)
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
