package com.waterfilter.water.Baranch;

import org.springframework.stereotype.Service;

@Service
public class BranchMapper {

    public BranchResponse toBranchResponse(Branch branch) {
        return BranchResponse.builder()
                .branchId(branch.getBranchId())
                .name(branch.getName())
                .phoneNumber(branch.getPhoneNumber())
                .managerName(branch.getManagerName())
                .coverageRediusKm(branch.getCoverageRadiusKm())
                .build();
    }

}
