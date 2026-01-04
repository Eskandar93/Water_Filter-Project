package com.waterfilter.water.location;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationValidationRequest {

  private Long employeeId;
  private Double latitude;
  private Double longitude;
}