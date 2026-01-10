package com.waterfilter.water.employee;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.waterfilter.water.insurance.InsuranceType;
import com.waterfilter.water.user.UserRole;
import com.waterfilter.water.user.UserType;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String phoneNumber;
    private String employeeCode;
    private LocalDate hireDate;
    private BigDecimal salary;
    private UserRole role;
    private UserType type;

    // Department info
    private String departmentName;

    // Branch info
    private String branchName;


    // Nested DTOs
//    private List<AddressResponse> addresses;
    private List<InsuranceType> insurances;
}
