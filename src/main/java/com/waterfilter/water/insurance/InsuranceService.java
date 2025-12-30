package com.waterfilter.water.insurance;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.waterfilter.water.exception.DublicateResourceException;
import com.waterfilter.water.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InsuranceService {
  private final InsuranceRepository insuranceRepository;
  private final InsuranceMapper insuranceMapper;

  @Transactional
  public void addInsurance(InsuranceRequest insuranceRequest){
    
    if(insuranceRepository.findInsuranceByInsuranceType(insuranceRequest.getInsuranceType()).isPresent()){
      throw new DublicateResourceException("Insurance has type " + insuranceRequest.getInsuranceType() + " already exist");
    }

    Insurance insurance = new Insurance();
    insurance.setInsuranceType(insuranceRequest.getInsuranceType());

    insuranceRepository.save(insurance);
  }

  // update
  public void updateInsurance(Long oldInsuranceId, InsuranceRequest insuranceRequest){
    Insurance insurance = insuranceRepository.findInsuranceByInsuranceId(oldInsuranceId)
    .orElseThrow(()-> new ResourceNotFoundException("Insurance not found with id " + oldInsuranceId));

    if(insuranceRepository.findInsuranceByInsuranceType(insuranceRequest.getInsuranceType()).isPresent()){
      throw new DublicateResourceException("Insurance has type " + insuranceRequest.getInsuranceType() + " already exist");
    }
    
    insurance.setInsuranceType(insuranceRequest.getInsuranceType());
    insuranceRepository.save(insurance);
  }  

  // get insurance by id
  public InsuranceResponse getInsuranceById(Long insuranceId){
    
    Insurance existingInsurance = insuranceRepository.findInsuranceByInsuranceId(insuranceId)
        .orElseThrow(() -> new ResourceNotFoundException("Insurance not found with id " +  insuranceId));

    return insuranceMapper.toInsuranceResponse(existingInsurance);
  }

  // get all insurance
  public List<InsuranceResponse> getAllInsurance(){
    List<Insurance>insurances = insuranceRepository.findAll();
    return insurances.stream()
            .map(insuranceMapper::toInsuranceResponse)
            .collect(Collectors.toList());
  }

  // delete insurance 
  @Transactional
  public void deleteInsuranceById(Long insuranceId){
    if(!insuranceRepository.findById(insuranceId).isPresent()){
      throw new ResourceNotFoundException("Insurance not found with id "+ insuranceId);
    }

    insuranceRepository.deleteById(insuranceId);
  }
}
