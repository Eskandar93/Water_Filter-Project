package com.waterfilter.water.address;

import org.springframework.stereotype.Service;

@Service
public class AddressMapper {
    public AddressResponse toAddressResponse(Address address) {
        return AddressResponse.builder()
                .government(address.getGovernment())
                .city(address.getCity())
                .postalCode(address.getPostalCode())
                .location(address.getLocation())
                .famousPlace1(address.getFamousPlace1())
                .famousPlace2(address.getFamousPlace2())
                .build();
    }

    public Address toEntity(AddressRequest addressRequest){

        if (addressRequest == null) return null;

        return Address.builder()
        .government(addressRequest.getGovernment())
        .city(addressRequest.getCity())
        .postalCode(addressRequest.getPostalCode())
        .location(addressRequest.getLocation())
        .famousPlace1(addressRequest.getFamousPlace1())
        .famousPlace2(addressRequest.getFamousPlace2())
        .build();
    }

    // update the address
    public void updateAddress(Address address, AddressRequest request){

        if(request == null) return;

        address.setGovernment(request.getGovernment());
        address.setCity(request.getCity());
        address.setPostalCode(request.getPostalCode());
        address.setLocation(request.getLocation());
        address.setFamousPlace1(request.getFamousPlace1());
        address.setFamousPlace2(request.getFamousPlace2());
    }
}
