package com.waterfilter.water.Baranch;

import com.waterfilter.water.address.Address;
import com.waterfilter.water.customer.Customer;
import com.waterfilter.water.department.Department;
import com.waterfilter.water.employee.Employee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "branch")

@NamedQuery(name = BranchConstants.FIND_BRANCH_BY_BRANCHID,
                    query = "SELECT b FROM Branch b WHERE b.branchId = :branchId")
public class Branch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long branchId;

    private String name;
    private String phoneNumber;
    private String managerName;

    @OneToOne(mappedBy = "branch", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //@JoinColumn(name = "address_id")
    private Address address;

    @OneToMany(mappedBy = "employeeBranch", cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.REFRESH, CascadeType.DETACH
    }, fetch = FetchType.LAZY)
    private List<Employee> employees;

    @OneToMany(mappedBy = "customerBranch",  cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.REFRESH, CascadeType.DETACH
    }, fetch = FetchType.LAZY)
    private List<Customer> customers;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    private List<Department> departments;

    // explain this method
    // PrePersist/PreUpdate to ensure relationship
    @PrePersist
    @PreUpdate
    private void ensureAddressRelationship() {
        if (address != null && address.getBranch() != this) {
            address.setBranch(this);
        }
    }

    // explain this method
    // Custom setter that maintains bidirectional relationship
    // public void addAddress(Address address) {
    //     this.address = address;
    //     if (address != null && address.getBranch() != this) {
    //         address.setBranch(this);  // This sets the foreign key
    //     }
    // }
}
