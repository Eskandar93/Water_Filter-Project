package com.waterfilter.water.location;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationValidationRequest {

  private Long employeeId;
  private double latitude;
  private double longitude;
  private LocalDateTime locationTimestamp;
}