package com.waterfilter.water.customer;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public void addCustomer(CustomerRequest customer) {

        Optional<Customer> existingCustomer = customerRepository.findCustomerByPhoneNumber(customer.getPhoneNumber());
        if (existingCustomer.isPresent()) {
            throw new RuntimeException("this customer already exists");
        }

        Customer cu = new Customer();
        cu.setFirstName(customer.getFirstName());
        cu.setMiddleName(customer.getMiddleName());
        cu.setLastName(customer.getLastName());
        cu.setPhoneNumber(customer.getPhoneNumber());
        cu.setCustomerAddresses(customer.getAddresses());

        // check branch is exist or not by id
        // set branch
        //cu.setBranch(customer.getBranch());

        customerRepository.save(cu);
    }

    public void updateCustomer(CustomerRequest customer) {

        Optional<Customer> existingCustomer = customerRepository.findCustomerByTotalName(customer.getFirstName(), customer.getMiddleName(), customer.getLastName());

        if(!existingCustomer.isPresent()){
            throw new RuntimeException("This Customer not found");
        }

        else {
            Customer curCustomer = existingCustomer.get();

            if(curCustomer.getPhoneNumber().equals(customer.getPhoneNumber())) {

                curCustomer.setFirstName(customer.getFirstName());
                curCustomer.setMiddleName(customer.getMiddleName());
                curCustomer.setLastName(customer.getLastName());
                curCustomer.setPhoneNumber(customer.getPhoneNumber());
                curCustomer.setCustomerAddresses(customer.getAddresses());
                // check branch is exist or not by id
                // set branch
               // curCustomer.setBranch(customer.getBranch());
                customerRepository.save(curCustomer);
            }
        }
    }

    public CustomerResponse getCustomer(String phoneNumber) {
        Optional<Customer> customer = customerRepository.findCustomerByPhoneNumber(phoneNumber);

        if(!customer.isPresent()){
            throw new RuntimeException("Customer not found with phone: " + phoneNumber);
        }

        return customerMapper.toCustomerResponse(customer.get());
    }

}
