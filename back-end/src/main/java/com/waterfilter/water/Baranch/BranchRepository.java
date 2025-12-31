package com.waterfilter.water.Baranch;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {

    @Query(name = BranchConstants.FIND_BRANCH_BY_BRANCHID)
    Optional<Branch> findBranchByBranchId(@Param("branchId") Long branchId);

    Optional<Branch> findByName(String name);

    Optional<Branch> findByPhoneNumber(String phoneNumber);
}
