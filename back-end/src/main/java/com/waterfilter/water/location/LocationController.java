package com.waterfilter.water.location;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterfilter.water.apiResponse.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/locations/")
public class LocationController {

  private final LocationValidationService locationValidationService;

  @PostMapping("validate-employee-location")
  public ResponseEntity<ApiResponse<LocationValidationResponse>> NearbyAddresses(@RequestBody LocationValidationRequest request){
    LocationValidationResponse locationValidationResponse = locationValidationService.isEmployeeWithinBranchCoverage(request);
    ApiResponse<LocationValidationResponse> response = ApiResponse.success(locationValidationResponse, "Valid Location");
    return ResponseEntity.ok(response);
  }
  
}
