package com.waterfilter.water.insurance;

import org.springframework.stereotype.Service;

@Service
public class InsuranceMapper {
  public InsuranceResponse toInsuranceResponse(Insurance insurance){
    return InsuranceResponse.builder()
      .insuranceId(insurance.getInsuranceId())
      .insuranceType(insurance.getInsuranceType())
      .build();
  }
}
