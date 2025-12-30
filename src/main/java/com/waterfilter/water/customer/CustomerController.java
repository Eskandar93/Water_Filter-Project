package com.waterfilter.water.customer;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/customers/")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("addCustomer")
    public ResponseEntity<?> addCustomer(@RequestBody CustomerRequest customer){
        customerService.addCustomer(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body("Customer added successfully.");
    }

    @PutMapping("updateCustomer")
    public ResponseEntity<String> updateCustomer(@RequestBody CustomerRequest customer){
        customerService.updateCustomer(customer);
        return ResponseEntity.ok("Customer updated successfully.");
    }

    @GetMapping("getCustomer/{phoneNumber}")
    public ResponseEntity<CustomerResponse> getCustomer(@PathVariable String phoneNumber){
        return ResponseEntity.ok(customerService.getCustomer(phoneNumber));
    }
}
