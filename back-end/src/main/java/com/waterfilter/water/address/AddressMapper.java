package com.waterfilter.water.address;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressMapper {

    // convert address to address response
    public AddressResponse toAddressResponse(Address address) {
        if (address == null) return null;
            
        return AddressResponse.builder()
                .id(address.getAddressId())
                .government(address.getGovernment())
                .city(address.getCity())
                .postalCode(address.getPostalCode())
                .famousPlace1(address.getFamousPlace1())
                .famousPlace2(address.getFamousPlace2())
                .build();
    }

    // conert address request to entity
    public Address toEntity(AddressRequest addressRequest){

        if (addressRequest == null) return null;

        return Address.builder()
        .government(addressRequest.getGovernment())
        .city(addressRequest.getCity())
        .postalCode(addressRequest.getPostalCode())
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
        address.setFamousPlace1(request.getFamousPlace1());
        address.setFamousPlace2(request.getFamousPlace2());
    }

}
