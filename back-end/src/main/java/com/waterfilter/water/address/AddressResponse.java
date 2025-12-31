package com.waterfilter.water.address;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressResponse {

    private String government;
    private String city;
    private String postalCode;
    private String famousPlace1;
    private String famousPlace2;
    private String location;
}
