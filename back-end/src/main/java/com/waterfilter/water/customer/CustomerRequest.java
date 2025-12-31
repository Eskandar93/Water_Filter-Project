package com.waterfilter.water.customer;

import com.waterfilter.water.address.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRequest {

    private String firstName;
    private String middleName;
    private String lastName;
    private String phoneNumber;

    private List<Address> addresses;
    private Long branchId;
}
