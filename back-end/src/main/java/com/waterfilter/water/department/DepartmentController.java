package com.waterfilter.water.department;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterfilter.water.apiResponse.ApiResponse;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@AllArgsConstructor
@RequestMapping("api/v1/departments/")
public class DepartmentController {

  private final DepartmentService departmentService;
  @PostMapping("addDepartment")
  public ResponseEntity<ApiResponse<String>> addDepartment(@RequestBody DepartmentRequest departmentrequest){
    departmentService.addDepartment(departmentrequest);
    ApiResponse<String> response = ApiResponse.created("Department added successfully");
    return ResponseEntity.ok(response);
  }

  @PutMapping("updateDepartment/{oldDepartmentId}")
  public ResponseEntity<ApiResponse<String>> updateDepartment(@PathVariable Long oldDepartmentId, @RequestBody DepartmentRequest departmentrequest){
    departmentService.updateDepartment(oldDepartmentId, departmentrequest);
    ApiResponse<String> response = ApiResponse.success("Department updated successfully");
    return ResponseEntity.ok(response);
  }


  @GetMapping("geDepartmentById/{departmentId}")
  public ResponseEntity<ApiResponse<DepartmentResponse>> getDepartmentById(@PathVariable Long departmentId){
    DepartmentResponse departmentResponse = departmentService.getDepartmentById(departmentId);
    ApiResponse<DepartmentResponse> response = ApiResponse.success(departmentResponse);
    return ResponseEntity.ok(response);
  }

  @GetMapping("getAllDepartments")
  public ResponseEntity<ApiResponse<List<DepartmentResponse>>> getAllDepartments(){

    List<DepartmentResponse> departmentsResponse = departmentService.getAllDepartments();
    ApiResponse<List<DepartmentResponse>> response = ApiResponse.success(departmentsResponse);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("deleteDepartmentById/{departmentId}")
  public ResponseEntity<ApiResponse<String>> deleteDepartmentById(@PathVariable Long departmentId){
    departmentService.deleteDepartmentById(departmentId);
    ApiResponse<String> response = ApiResponse.success("Department deleted successfully");
    return ResponseEntity.ok(response);
  }

}
