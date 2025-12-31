package com.waterfilter.water.customer;

import com.waterfilter.water.Baranch.Branch;
import com.waterfilter.water.address.Address;
import com.waterfilter.water.user.UserType;
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
@Table(name = "customer")

@NamedQuery(name = CustomerConstants.FIND_CUSTOMER_BY_PHONENUMBER,
        query = "SELECT c FROM Customer c WHERE c.phoneNumber = :phoneNumber")
@NamedQuery(name = CustomerConstants.FIND_CUSTOMER_BY_TOTALNAME,
query = "SELECT c FROM Customer c WHERE c.firstName = :firstName and " +
        "c.middleName = :middleName and c.lastName = :lastName")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;
    private String firstName;
    private String middleName;
    private String lastName;

    private String email;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    // One user can have multiple addresses
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Address> customerAddresses;

    // Many users belong to one branch
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch customerBranch;

    // list order
}
