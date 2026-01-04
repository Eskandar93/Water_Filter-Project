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
  public ResponseEntity<ApiResponse<LocationValidationResponse>> validateEmployeeLocation(@RequestBody LocationValidationRequest request){
    LocationValidationResponse response = locationValidationService.validateEmployeeLocation(request);
    ApiResponse<LocationValidationResponse> apiResponse = ApiResponse.success(response, response.getMessage());
    return ResponseEntity.ok(apiResponse);
  }
  
}
