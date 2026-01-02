package com.waterfilter.water.address;

import com.waterfilter.water.location.LocationDto;

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
    private LocationDto location;
}
