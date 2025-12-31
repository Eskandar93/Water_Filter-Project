package com.waterfilter.water.insurance;

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
@RequestMapping("api/v1/insurances/")
public class InsuranceController {

  private final InsuranceService insuranceService;

  @PostMapping("addInsurance")
  public ResponseEntity<ApiResponse<String>> addInsurance(@RequestBody InsuranceRequest insuranceRequest){
    insuranceService.addInsurance(insuranceRequest);
    ApiResponse<String> response = ApiResponse.created("Insurance added successfully");
    return ResponseEntity.ok(response);
  }

  @PutMapping("updateInsurance/{oldInsuranceId}")
  public ResponseEntity<ApiResponse<String>> updateInsurance(@PathVariable Long oldInsuranceId, @RequestBody InsuranceRequest insuranceRequest){
    insuranceService.updateInsurance(oldInsuranceId, insuranceRequest);
    ApiResponse<String> response = ApiResponse.success("Insurance updated successfully");
    return ResponseEntity.ok(response);
  }
  @GetMapping("getInsuranceById/{insuranceId}")
  public ResponseEntity<ApiResponse<InsuranceResponse>> getInsuranceById(@PathVariable Long insuranceId){
    InsuranceResponse insuranceResponse = insuranceService.getInsuranceById(insuranceId);
    ApiResponse<InsuranceResponse> response = ApiResponse.success(insuranceResponse);
    return ResponseEntity.ok(response);
  }

   @GetMapping("getAllInsurances")
   public ResponseEntity<ApiResponse<List<InsuranceResponse>>> getAllInsurance(){
    List<InsuranceResponse> insurances = insuranceService.getAllInsurance();
    ApiResponse<List<InsuranceResponse>> response = ApiResponse.success(insurances);
    return ResponseEntity.ok(response);
   }

   @DeleteMapping("deleteInsuranceById/{insuranceId}")
   public ResponseEntity<ApiResponse<String>> deleteInsuranceById(@PathVariable Long insuranceId){
    insuranceService.deleteInsuranceById(insuranceId);
    ApiResponse<String> response = ApiResponse.success("Insurance deleted successfully");
    return ResponseEntity.ok(response);
   }
}
