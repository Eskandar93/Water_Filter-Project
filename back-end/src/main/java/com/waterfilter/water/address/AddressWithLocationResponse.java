package com.waterfilter.water.address;

import com.waterfilter.water.location.LocationDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressWithLocationResponse {
  
    private Long id;
    private String government;
    private String city;
    private String postalCode;
    private String famousPlace1;
    private String famousPlace2;
    private LocationDto location;
}
