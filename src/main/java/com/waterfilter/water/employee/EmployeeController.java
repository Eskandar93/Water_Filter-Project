package com.waterfilter.water.employee;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterfilter.water.apiResponse.ApiResponse;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/employees/")
public class EmployeeController {
  private final EmployeeService employeeService;


  @PostMapping("addEmployee")
  public ResponseEntity<ApiResponse<String>> addEmployee(@RequestBody EmployeeRequest employeeRequest){
    employeeService.addEmployee(employeeRequest);
    ApiResponse<String> response = ApiResponse.created("Employee added successfully");
    return ResponseEntity.ok(response);
  }

  @PutMapping("updateEmployee/{oldEmployeeId}")
  public ResponseEntity<ApiResponse<String>> updateEmployee(@PathVariable Long oldEmployeeId, @RequestBody EmployeeRequest employeeRequest){
    employeeService.updateEmployee(oldEmployeeId, employeeRequest);
    ApiResponse<String> response = ApiResponse.success("Employee updated successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("getEmployeeById/{employeeId}")
  public ResponseEntity<ApiResponse<EmployeeResponse>> getEmployeeById(@PathVariable Long employeeId){
    EmployeeResponse employeeResponse = employeeService.getEmployeeById(employeeId);
    ApiResponse<EmployeeResponse> response = ApiResponse.success(employeeResponse);
    return ResponseEntity.ok(response);
  }

  @GetMapping("getAllEmployees/")
  public ResponseEntity<ApiResponse<List<EmployeeResponse>>> getAllEmployees(){
    List<EmployeeResponse> employeeResponse = employeeService.getAllEmployees();
    ApiResponse<List<EmployeeResponse>> response = ApiResponse.success(employeeResponse);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("deleteEmployeeById/{employeeId}")
  public ResponseEntity<ApiResponse<String>> deleteEmployeeById(@PathVariable Long employeeId){
    employeeService.deleteEmployeeById(employeeId);
    ApiResponse<String> response = ApiResponse.success("Employee deleted successfully");
    return ResponseEntity.ok(response);
  }
}
