package com.waterfilter.water.resetPassword;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.waterfilter.water.exception.InvalidOtpException;
import com.waterfilter.water.exception.ResourceNotFoundException;
import com.waterfilter.water.otp.EmailService;
import com.waterfilter.water.resetPassword.ForgotPasswordRequest;
import com.waterfilter.water.otp.Otp;
import com.waterfilter.water.otp.OtpRepository;
import com.waterfilter.water.otp.OtpService;
import com.waterfilter.water.otp.OtpType;
import com.waterfilter.water.user.UserRepository;
import com.waterfilter.water.user.Users;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

  private final UserRepository userRepository;
  private final OtpService otpService;
  private final OtpRepository otpRepository;
  private final EmailService emailService;
  private final PasswordEncoder passwordEncoder;
  private final ResetTokenRepository resetTokenRepository;
  // initiatePasswordReset
  @Transactional
  public void initiatePasswordReset(ForgotPasswordRequest request){
    // Find user by email
    Users user = userRepository.findByEmail(request.getEmail())
      .orElseThrow(()-> new ResourceNotFoundException("User with email: "+ request.getEmail() +" is not exist"));

    LocalDateTime now = LocalDateTime.now();
    Optional<ResetToken> existingToken = resetTokenRepository.findByUserIdAndUsedIsFalseAndExpiresAtAfter(user.getId(), now);

    if(existingToken.isPresent()){
      throw new IllegalArgumentException("Password reset already initiated. Please check your email for OTP code.");
    }

    // Generate OTP
    Otp otp = otpService.createOtp(user, OtpType.PASSWORD_RESET);
    // Send OTP via email
    emailService.sendOtpEmail(request.getEmail(), otp.getCode());
  }

  public String verifyOtpAndGenerateToken(String email, String otpCode, OtpType otpType) {

      Users user = userRepository.findByEmail(email)
              .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

      // Verify OTP
      otpService.isValidOtp(user, otpCode, otpType);

      // Generate reset token (valid for 10 minutes)
      ResetToken resetToken = new ResetToken(user, 10);
      resetTokenRepository.save(resetToken);

      // Clean up old tokens
      resetTokenRepository.deleteByExpiresAtBefore(LocalDateTime.now());

      return resetToken.getToken();

  }

  // reset password
  @Transactional
  public void resetPassword(ResetPasswordRequest request){
      String newPassword = request.getNewPassword();
      String confirmPassword = request.getConfirmPassword();
      String token = request.getResetToken();

       // Validate password match
      if(!newPassword.equals(confirmPassword)){
        throw new IllegalArgumentException("Passwords do not match");
      }

      // Validate password strength
      validatePasswordStrength(newPassword);
      
      // find token
      LocalDateTime now = LocalDateTime.now();
      ResetToken resetToken = resetTokenRepository.findByTokenAndUsedIsFalseAndExpiresAtAfter(token, now)
      .orElseThrow(() -> new InvalidOtpException("Invalid or expired reset token"));

      // find user from token
      Users user = resetToken.getUser();

      // Mark token as used
      resetToken.setUsed(true);
      resetToken.setUsedAt(now);
      resetTokenRepository.save(resetToken);

      // Update password
      user.setPassword(passwordEncoder.encode(confirmPassword));
      user.setLastPasswordReset(LocalDateTime.now());
      userRepository.save(user);

      // Send confirmation email
      emailService.sendPasswordChangedConfirmation(user.getEmail(), user.getUsername());
  }

  private void validatePasswordStrength(String password) {
    if(password.length() < 8){
      throw new IllegalArgumentException("Password must be at least 8 characters long");
    }

    if(!password.matches(".*[A-Z].*")){
      throw new IllegalArgumentException("Password must contain at least one uppercase letter");
    }

    if(!password.matches(".*[a-z].*")){
      throw new IllegalArgumentException("Password must contain at least one lowercase letter");
    }

    if (!password.matches(".*\\d.*")) {
      throw new IllegalArgumentException("Password must contain at least one number");
    }

  }
}
