package com.waterfilter.water.address;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressRequest {

    private String government;
    private String city;
    private String postalCode;
    private String famousPlace1;
    private String famousPlace2;
    private String location;
}
