package com.waterfilter.water.insurance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InsuranceRepository extends JpaRepository<Insurance, Long>{
  
  @Query(name = InsuranceConstants.FIND_INSURANCE_BY_INSURANCEID)
  Optional<Insurance> findInsuranceByInsuranceId (@Param("insuranceId") Long insuranceId);

  @Query(name = InsuranceConstants.FIND_INSURANCE_BY_INSURANCETYPE)
  Optional<Insurance> findInsuranceByInsuranceType(@Param("insuranceType") InsuranceType insuranceType);
  
  @Query(name = InsuranceConstants.FIND_INSURANCE_BY_INSURANCEID_AND_INSURANCETYPE)
  Optional<Insurance> findInsuranceByInsuranceIdAndInsuranceType(@Param("insuranceId") Long insuranceId, @Param("insuranceType") InsuranceType insuranceType);
}