package com.waterfilter.water.address;

import org.springframework.stereotype.Service;

import com.waterfilter.water.location.Location;
import com.waterfilter.water.location.LocationMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressWithLocationMapper {

  private final LocationMapper locationMapper;

      public AddressWithLocationResponse toAddressResponse(Address address) {
        if (address == null) return null;
            
        return AddressWithLocationResponse.builder()
                .id(address.getAddressId())
                .government(address.getGovernment())
                .city(address.getCity())
                .postalCode(address.getPostalCode())
                .famousPlace1(address.getFamousPlace1())
                .famousPlace2(address.getFamousPlace2())
                .location(locationMapper.toLocationDto(address.getLocation()))
                .build();
    }
    
  public Address toEntity(AddressWithLocationRequest request){
        if (request == null) return null;

        Location location = (request.getLocation() != null) ? locationMapper.toEntity(request.getLocation()) : null;

        if(location == null){
            throw new IllegalArgumentException("Location is required for this address type");
        }

        return Address.builder()
                .government(request.getGovernment())
                .city(request.getCity())
                .postalCode(request.getPostalCode())
                .famousPlace1(request.getFamousPlace1())
                .famousPlace2(request.getFamousPlace2())
                .location(location)
                .build();

    }

    public void updateAddress(Address address, AddressWithLocationRequest request){

        if(request == null) return;

        address.setGovernment(request.getGovernment());
        address.setCity(request.getCity());
        address.setPostalCode(request.getPostalCode());
        address.setFamousPlace1(request.getFamousPlace1());
        address.setFamousPlace2(request.getFamousPlace2());
        address.setLocation(locationMapper.toEntity(request.getLocation()));
    }
}
