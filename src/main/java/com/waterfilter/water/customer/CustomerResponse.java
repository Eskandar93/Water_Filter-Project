package com.waterfilter.water.customer;

import com.waterfilter.water.address.Address;
import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponse {
    private String firstName;
    private String middleName;
    private String lastName;
    private String phoneNumber;

    private List<Address> addresses;
}
