package com.waterfilter.water.address;

import com.waterfilter.water.Baranch.Branch;
import com.waterfilter.water.customer.Customer;
import com.waterfilter.water.employee.Employee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    private String government;
    private String city;
    private String postalCode;
    private String famousPlace1;
    private String famousPlace2;
    private String location;

    @OneToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

//    @OneToOne
//    private Branch branch;

    // FIXED: Add cascade and make it the owning side
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "branch_id", referencedColumnName = "branchId")
    private Branch branch;

    // Helper method
    // public void addBranch(Branch branch) {
    //     this.branch = branch;
    //     if (branch != null && branch.getAddress() != this) {
    //         branch.addAddress(this);
    //     }
    // }
}
