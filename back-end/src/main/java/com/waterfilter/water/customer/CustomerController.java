package com.waterfilter.water.customer;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.waterfilter.water.apiResponse.ApiResponse;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/customers/")
public class CustomerController {

    private final CustomerService customerService;

     @PostMapping("addCustomer")
  public ResponseEntity<ApiResponse<CustomerResponse>> addCustomer(@RequestBody CustomerRequest customerRequest){
    CustomerResponse customerResponse = customerService.addCustomer(customerRequest);
    ApiResponse<CustomerResponse> response = ApiResponse.created(customerResponse, " Customer added successfully");
    return ResponseEntity.ok(response);
  }

  @PutMapping("updateCustome/{oldPhoneNumber}")
  public ResponseEntity<ApiResponse<String>> updateCustomer(@PathVariable String oldPhoneNumber, @RequestBody CustomerRequest customerRequest){
    customerService.updateCustomer(oldPhoneNumber, customerRequest);
    ApiResponse<String> response = ApiResponse.success("Customer updated successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("getCustomerByPhoneNumber/{phoneNumber}")
  public ResponseEntity<ApiResponse<CustomerResponse>> getCustomerByPhoneNumber(@RequestParam String phoneNumber){
    CustomerResponse customerResponse = customerService.getCustomerByPhoneNumber(phoneNumber);
    ApiResponse<CustomerResponse> response = ApiResponse.success(customerResponse);
    return ResponseEntity.ok(response);
  }

  @GetMapping("getAllCustomers")
  public ResponseEntity<ApiResponse<List<CustomerResponse>>> getAllCustomers(){
    List<CustomerResponse> customerResponses = customerService.getAllCustomers();
    ApiResponse<List<CustomerResponse>> response = ApiResponse.success(customerResponses);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("deleteCustomerByPhoneNumber/{phoneNumber}")
  public ResponseEntity<ApiResponse<String>> deleteCustomerByPhoneNumber(@RequestParam String phoneNumber){
    customerService.deleteCustomerByPhoneNumber(phoneNumber);
    ApiResponse<String> response = ApiResponse.success("Customer deleted successfully");
    return ResponseEntity.ok(response);
  }
}
