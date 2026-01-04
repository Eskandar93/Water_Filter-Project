package com.waterfilter.water.profile;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterfilter.water.apiResponse.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/profiles")
public class ProfileController {

  private final ProfileService profileService;
    // get user profile
  @GetMapping("profile")
  public ResponseEntity<ApiResponse<ProfileResponse>> getCurrentUserProfile(@RequestAttribute Long employeeId){
    ProfileResponse profile = profileService.getCurrentUserProfile(employeeId);
    ApiResponse<ProfileResponse> response = ApiResponse.success(profile, "Profile retrieved successfully");
    return ResponseEntity.ok(response);
  }
}
