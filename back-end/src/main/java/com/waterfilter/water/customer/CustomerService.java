package com.waterfilter.water.customer;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.waterfilter.water.address.Address;
import com.waterfilter.water.address.AddressMapper;
import com.waterfilter.water.address.AddressRequest;
import com.waterfilter.water.exception.DublicateResourceException;
import com.waterfilter.water.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    private final AddressMapper addressMapper;

    // with add should return respone to best api design
    @Transactional
    public CustomerResponse addCustomer(CustomerRequest request) {

        validateUniqueness(request);

        Customer customer = customerMapper.toEntity(request);
        
        setCustomerRelationship(customer, request);

        customerRepository.save(customer);
        return customerMapper.toCustomerResponse(customer);
    }

     private void validateUniqueness(CustomerRequest request){

        if (customerRepository.findCustomerByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            throw new DublicateResourceException("Customer has phone number: " + request.getPhoneNumber() + " already exists");
        }
     }

    private void setCustomerRelationship(Customer customer, CustomerRequest request) {

            // AddressRequest addressRequest = request.getAddress();
        if(request != null && request.getAddress() != null){

            Address address = addressMapper.toEntity(request.getAddress());
             address.setCustomer(customer);
            customer.setAddress(address);
        }
    }

    // update
    public void updateCustomer(String phoneNumber, CustomerRequest request){
           Customer customer = customerRepository.findCustomerByPhoneNumber(phoneNumber)
        .orElseThrow(() -> new ResourceNotFoundException("Customer has phone number: " + phoneNumber + " not exist"));

        validateUniqueFields(customer, request);
        updateBasicFields(customer, request);
        updateRelationships(customer, request);

        customerRepository.save(customer);
    }

    private void updateRelationships(Customer customer, CustomerRequest request) {
        if(request.getAddress() != null){
            updateAddress(customer, request.getAddress());
        }

    }

    private void updateAddress(Customer customer, AddressRequest addressRequest) {
        Address existingAddress = customer.getAddress();
        if(existingAddress == null){
            Address address = addressMapper.toEntity(addressRequest);
            customer.setAddress(address);
        } else {
            addressMapper.updateAddress(existingAddress, addressRequest);
        }
    }

    private void updateBasicFields(Customer customer, CustomerRequest request) {
        if(request.getFirstName() != null) customer.setFirstName(request.getFirstName());
        if(request.getMiddleName() != null) customer.setMiddleName(request.getMiddleName());
        if(request.getLastName() != null) customer.setLastName(request.getLastName());
        if(request.getEmail() != null) customer.setEmail(request.getEmail());
        if(request.getPhoneNumber() != null) customer.setPhoneNumber(request.getPhoneNumber());
    }

    private void validateUniqueFields(Customer customer, CustomerRequest request) {

        if(request.getEmail() != null && !customer.getEmail().equals(request.getEmail())){
            customerRepository.findCustomerByEmail(request.getEmail()).ifPresent(
                cust -> {
                    if(!cust.getCustomerId().equals(customer.getCustomerId())){
                        throw new DublicateResourceException("Email already in use: " + request.getEmail());
                    }
                }
            );
        }

        if(request.getPhoneNumber() != null && !customer.getPhoneNumber().equals(request.getPhoneNumber())){
            customerRepository.findCustomerByPhoneNumber(request.getPhoneNumber()).ifPresent(
                cust -> {
                    if(!cust.getCustomerId().equals(customer.getCustomerId())){
                        throw new DublicateResourceException("Phone Number already in use: " + request.getPhoneNumber());
                    }
                }
            );
        }
    }

      // find customer By Phone Number
      public CustomerResponse getCustomerByPhoneNumber(String phoneNumber){
        Customer customer = customerRepository.findCustomerByPhoneNumber(phoneNumber)
        .orElseThrow(() -> new ResourceNotFoundException("Customer has phone number: " + phoneNumber + " not exist"));

        return customerMapper.toCustomerResponse(customer);
    }

    // find all customers
    public List<CustomerResponse> getAllCustomers(){
        List<Customer> customers = customerRepository.findAll();
        return customers.stream()
                            .map(customerMapper::toCustomerResponse)
                            .collect(Collectors.toList());
    }

    // delete customers by phone number
       public void deleteCustomerByPhoneNumber(String phoneNumber){
        Customer customer = customerRepository.findCustomerByPhoneNumber(phoneNumber)
        .orElseThrow(() -> new ResourceNotFoundException("Customer has phone number: " + phoneNumber + " not exist"));

        customerRepository.deleteById(customer.getCustomerId());
    }
}
