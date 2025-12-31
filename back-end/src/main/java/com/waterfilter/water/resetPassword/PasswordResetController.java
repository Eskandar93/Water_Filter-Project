package com.waterfilter.water.resetPassword;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterfilter.water.apiResponse.ApiResponse;
import com.waterfilter.water.exception.InvalidOtpException;
import com.waterfilter.water.otp.OtpType;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/passwords/")
public class PasswordResetController {

  private final PasswordResetService passwordResetService;

    @PostMapping("forgot-password")
  public ResponseEntity<ApiResponse<String>> forgetPassword(@RequestBody ForgotPasswordRequest request){
    passwordResetService.initiatePasswordReset(request);
    ApiResponse<String> response = ApiResponse.success("Otp code sent to your email successfully");
    return ResponseEntity.ok(response);
  }

   @PostMapping("verify-otp-password-reset")
  public ResponseEntity<ApiResponse<String>> verifyOtp(
    @RequestBody VerifyOtpRequest request,
    HttpServletResponse httpServletResponse
    ){
    ResetToken resetToken = passwordResetService.verifyOtpAndGenerateToken(
        request.getOtpCode(),
        OtpType.PASSWORD_RESET
      );

      // Set token in HTTP-only cookie
      Cookie tokenCookie = new Cookie("reset_token", resetToken.getToken());
      tokenCookie.setHttpOnly(true);
      tokenCookie.setSecure(false);
      tokenCookie.setPath("/");
      tokenCookie.setMaxAge(10*60);
      httpServletResponse.addCookie(tokenCookie);

      // VerifyOtpResponse verifyOtpResponse = otpMapper.toOtpResponse(resetToken);
      ApiResponse<String> response = ApiResponse.success( "OTP verified. You can now reset password.");
      
      return ResponseEntity.ok(response);
  }


  
  @PostMapping("reset-password")
  public ResponseEntity<ApiResponse<String>> resetPassword(
    @RequestBody ResetPasswordRequest request,
    @CookieValue(name = "reset_token", required = false) String resetToken,
    HttpServletResponse httpServletResponse
    ){

    if(resetToken == null){
      throw new InvalidOtpException("Reset session expired. Please sent OTP Again.");
    }

    passwordResetService.resetPassword(resetToken, request);

    // Clear the cookie after successful reset
    Cookie clearcCookie = new Cookie("reset_token", null);
    clearcCookie.setSecure(false);
    clearcCookie.setPath("/");
    clearcCookie.setMaxAge(0);
    httpServletResponse.addCookie(clearcCookie);

    ApiResponse<String> response = ApiResponse.success("Password reset successfully");
    return ResponseEntity.ok(response);
  }

}
