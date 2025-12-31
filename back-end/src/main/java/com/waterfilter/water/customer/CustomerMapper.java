package com.waterfilter.water.customer;

import org.springframework.stereotype.Service;

@Service
public class CustomerMapper {

    public CustomerResponse toCustomerResponse(Customer customer) {

        return CustomerResponse.builder()
                .firstName(customer.getFirstName())
                .middleName(customer.getMiddleName())
                .lastName(customer.getLastName())
                .phoneNumber(customer.getPhoneNumber())
                .addresses(customer.getCustomerAddresses())
                .build();
    }
}
