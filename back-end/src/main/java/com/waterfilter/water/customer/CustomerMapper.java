package com.waterfilter.water.customer;

import org.springframework.stereotype.Service;

import com.waterfilter.water.address.AddressMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerMapper {

    private final AddressMapper addressMapper;
    public CustomerResponse toCustomerResponse(Customer customer) {

        return CustomerResponse.builder()
                .id(customer.getCustomerId())
                .firstName(customer.getFirstName())
                .middleName(customer.getMiddleName())
                .lastName(customer.getLastName())
                .phoneNumber(customer.getPhoneNumber())
                .address(addressMapper.toAddressResponse(customer.getAddress()))
                .build();
    }

    public Customer toEntity(CustomerRequest request){
        return Customer.builder()
        .firstName(request.getFirstName())
        .middleName(request.getMiddleName())
        .lastName(request.getLastName())
        .email(request.getEmail())
        .phoneNumber(request.getPhoneNumber())
        .build();
    }
}
