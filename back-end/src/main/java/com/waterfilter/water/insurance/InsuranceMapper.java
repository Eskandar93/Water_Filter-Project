package com.waterfilter.water.insurance;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class InsuranceMapper {
  public InsuranceResponse toInsuranceResponse(Insurance insurance){
    return InsuranceResponse.builder()
      .id(insurance.getInsuranceId())
      .insuranceType(insurance.getInsuranceType())
      .build();
  }

  public List<InsuranceType> toInsuranceTypeList(List<Insurance> insurances) {
    if(insurances == null || insurances.isEmpty()) return List.of();

    return insurances.stream()
              .map(Insurance::getInsuranceType)
              .filter(type -> type != null)
              .collect(Collectors.toList());
  }

}
