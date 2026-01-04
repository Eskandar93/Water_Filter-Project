package com.waterfilter.water.employee;

import com.waterfilter.water.Baranch.Branch;
import com.waterfilter.water.address.Address;
import com.waterfilter.water.department.Department;
import com.waterfilter.water.insurance.Insurance;
import com.waterfilter.water.user.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
// @Table(name = "employee")
@DiscriminatorValue("EMPLOYEE")
@PrimaryKeyJoinColumn(name = "user_id")

@NamedQuery(name = EmployeeConstants.FIND_USER_BY_EMAIL,
        query = "SELECT e FROM Employee e WHERE e.email = :email")
@NamedQuery(name = EmployeeConstants.FIND_USER_BY_PHONENUMBER,
        query = "SELECT e FROM Employee e WHERE e.phoneNumber = :phoneNumber")
@NamedQuery(name = EmployeeConstants.FIND_USER_BY_ID,
        query = "SELECT e FROM Employee e WHERE e.Id = :userId")
public class Employee extends Users {

//     @Column(nullable = false, unique = true)
//     private String email;

//     @Column(unique = true)
//     private String username;

//     @Column(nullable = false)
//     private String password;

    private String employeeCode;
    private LocalDate hireDate;
    private BigDecimal salary;
    private LocalDateTime lastLogin;
    private boolean isActive;

    // One user can have multiple addresses
    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Address employeeAddresses;

    // Many users belong to one branch
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch employeeBranch;

    // Many users can have many insurances
    @ManyToMany
    @JoinTable(
            name = "employee_insurance",
            joinColumns = @JoinColumn(name = "employee_id"),
            inverseJoinColumns = @JoinColumn(name = "insurance_id")
    )
    private List<Insurance> insurances;

    // Many users belong to one department
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @PrePersist
    @PreUpdate
    private void ensureAddressRelationship(){
        if(employeeAddresses != null && employeeAddresses.getEmployee() != this){
                employeeAddresses.setEmployee(this);
        }
    }

}
