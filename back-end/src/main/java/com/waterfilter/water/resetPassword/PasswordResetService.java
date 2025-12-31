package com.waterfilter.water.resetPassword;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.waterfilter.water.exception.InvalidOtpException;
import com.waterfilter.water.exception.ResourceNotFoundException;
import com.waterfilter.water.otp.EmailService;
import com.waterfilter.water.otp.Otp;
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

  public ResetToken verifyOtpAndGenerateToken(String otpCode, OtpType otpType) {

    
      // Verify and find OTP
      Otp otp = otpService.validateAndVerifyOtp(otpCode, otpType);

      // Get email/user from OTP
      Users user = otp.getUser();

      // Generate reset token (valid for 10 minutes)
      ResetToken resetToken = new ResetToken(user, 10);
      resetTokenRepository.save(resetToken);

      // Clean up old tokens
      resetTokenRepository.deleteByExpiresAtBefore(LocalDateTime.now());

      return resetToken;

  }

  // reset password
  @Transactional
  public void resetPassword(String resetToken, ResetPasswordRequest request){
      String newPassword = request.getNewPassword();
      String confirmPassword = request.getConfirmPassword();

       // Validate password match
      if(!newPassword.equals(confirmPassword)){
        throw new IllegalArgumentException("Passwords do not match");
      }

      // Validate password strength
      validatePasswordStrength(newPassword);
      
      // find token
      LocalDateTime now = LocalDateTime.now();
      ResetToken token = resetTokenRepository.findByTokenAndUsedIsFalseAndExpiresAtAfter(resetToken, now)
      .orElseThrow(() -> new InvalidOtpException("Invalid or expired reset token"));

      // find user from token
      Users user = token.getUser();

      // Mark token as used
      token.setUsed(true);
      token.setUsedAt(now);
      resetTokenRepository.save(token);

      // Update password
      user.setPassword(passwordEncoder.encode(confirmPassword));
      user.setLastPasswordReset(LocalDateTime.now());
      userRepository.save(user);

      // Send confirmation email
      emailService.sendPasswordChangedConfirmation(user.getEmail(), user.getUsername());
  }

  private void validatePasswordStrength(String password) {
    List<String> errors = new ArrayList<>();

    if(password.length() < 8){
      errors.add("Password must be at least 8 characters long");
    }

    if(!password.matches(".*[A-Z].*")){
      errors.add("Password must contain at least one uppercase letter");
    }

    if(!password.matches(".*[a-z].*")){
      errors.add("Password must contain at least one lowercase letter");
    }

    if (!password.matches(".*\\d.*")) {
      errors.add("Password must contain at least one number");
    }

    if(!password.matches(".*[!@#$%^&*/+-=].*")){
      errors.add("Password must contain at least one special character (!@#$%^&*/+-=)");
    }

    if(!errors.isEmpty()){
      throw new IllegalArgumentException("Password requierments: " + String.join(",", errors));
    }
  }
}
