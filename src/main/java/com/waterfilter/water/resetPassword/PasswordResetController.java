package com.waterfilter.water.resetPassword;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterfilter.water.apiResponse.ApiResponse;
import com.waterfilter.water.otp.OtpType;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/passwords")
public class PasswordResetController {

  private final PasswordResetService passwordResetService;

    @PostMapping("forgot-password")
  public ResponseEntity<ApiResponse<String>> forgetPassword(@RequestBody ForgotPasswordRequest request){
    passwordResetService.initiatePasswordReset(request);
    ApiResponse<String> response = ApiResponse.success("Otp code sent to your email successfully");
    return ResponseEntity.ok(response);
  }

  @PostMapping("verify-otp")
  public ResponseEntity<ApiResponse<Map<String, String>>> verifyOtp(@RequestBody VerifyOtpRequest request){
    String resetToken = passwordResetService.verifyOtpAndGenerateToken(
        request.getEmail(), 
        request.getOtpCode(),
        OtpType.PASSWORD_RESET
      );

      Map<String, String> data = Map.of("resetToken", resetToken);
      ApiResponse<Map<String, String>> response = ApiResponse.success(data, "OTP verified. You can now reset password.");
      return ResponseEntity.ok(response);
  }

  @PostMapping("reset-password")
  public ResponseEntity<ApiResponse<String>> resetPassword(@RequestBody ResetPasswordRequest request){
    passwordResetService.resetPassword(request);
    ApiResponse<String> response = ApiResponse.success("Password reset successfully");
    return ResponseEntity.ok(response);
  }

    @PostMapping("resend-otp")
  public ResponseEntity<ApiResponse<String>> resendOtp(@RequestBody ForgotPasswordRequest request){
    passwordResetService.initiatePasswordReset(request);
    ApiResponse<String> response = ApiResponse.success("New OTP sent to your email");
    return ResponseEntity.ok(response);
  }

}
