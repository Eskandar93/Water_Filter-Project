package com.waterfilter.water.customer;

import com.waterfilter.water.address.AddressRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRequest {

    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String phoneNumber;

    private AddressRequest address;
}
