package com.waterfilter.water.customer;

import com.waterfilter.water.address.AddressResponse;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponse {
    
    private Long id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String phoneNumber;

    private AddressResponse address;
}
