package com.waterfilter.water.employee;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.waterfilter.water.user.UserRole;
import com.waterfilter.water.user.UserType;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeResponse {

    private Long employeeId;
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
    private Long departmentId;

    // Branch info
    private String branchName;
    private Long branchId;

    // Nested DTOs
//    private List<AddressResponse> addresses;
//    private List<InsuranceResponse> insurances;
}
