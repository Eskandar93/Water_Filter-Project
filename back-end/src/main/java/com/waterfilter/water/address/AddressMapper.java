package com.waterfilter.water.address;

import org.springframework.stereotype.Service;

import com.waterfilter.water.location.LocationMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressMapper {
    private final LocationMapper locationMapper;
    public AddressResponse toAddressResponse(Address address) {
        return AddressResponse.builder()
                .government(address.getGovernment())
                .city(address.getCity())
                .postalCode(address.getPostalCode())
                .famousPlace1(address.getFamousPlace1())
                .famousPlace2(address.getFamousPlace2())
                .location(locationMapper.toLocationDto(address.getLocation()))
                .build();
    }

    public Address toEntity(AddressRequest addressRequest){

        if (addressRequest == null) return null;

        return Address.builder()
        .government(addressRequest.getGovernment())
        .city(addressRequest.getCity())
        .postalCode(addressRequest.getPostalCode())
        .famousPlace1(addressRequest.getFamousPlace1())
        .famousPlace2(addressRequest.getFamousPlace2())
        .location(locationMapper.toEntity(addressRequest.getLocation()))
        .build();
    }

    // update the address
    public void updateAddress(Address address, AddressRequest request){

        if(request == null) return;

        address.setGovernment(request.getGovernment());
        address.setCity(request.getCity());
        address.setPostalCode(request.getPostalCode());
        address.setFamousPlace1(request.getFamousPlace1());
        address.setFamousPlace2(request.getFamousPlace2());
        address.setLocation(locationMapper.toEntity(request.getLocation()));
    }
}
