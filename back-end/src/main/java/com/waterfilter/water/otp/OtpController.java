package com.waterfilter.water.otp;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterfilter.water.apiResponse.ApiResponse;
import com.waterfilter.water.resetPassword.ForgotPasswordRequest;
import com.waterfilter.water.resetPassword.PasswordResetService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/otps/")
public class OtpController {

    private final PasswordResetService passwordResetService;
 
  @PostMapping("resend-otp")
  public ResponseEntity<ApiResponse<String>> resendOtp(@RequestBody ForgotPasswordRequest request){
    passwordResetService.initiatePasswordReset(request);
    ApiResponse<String> response = ApiResponse.success("New OTP sent to your email");
    return ResponseEntity.ok(response);
  }

}
