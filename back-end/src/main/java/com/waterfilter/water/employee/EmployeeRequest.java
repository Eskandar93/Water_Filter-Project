package com.waterfilter.water.employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

import com.waterfilter.water.address.AddressRequest;
import com.waterfilter.water.user.UserRole;
import com.waterfilter.water.user.UserType;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRequest {
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String username;
    private String phoneNumber;
    private String password;

    private Long departmentId; 
    private Long branchId;
    private AddressRequest addressRequest;
    private List<Long> insuranceIds;    
    private BigDecimal salary;   // Optional (Admin only)
    private UserRole role;
    private UserType type;
}
