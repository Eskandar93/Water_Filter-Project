package com.waterfilter.water.resetPassword;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifyOtpResponse {

  private String resetToken;
  private LocalDateTime tokenExpiry;
}
