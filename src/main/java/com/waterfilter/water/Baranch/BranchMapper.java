package com.waterfilter.water.Baranch;

import org.springframework.stereotype.Service;

@Service
public class BranchMapper {

    public BranchResponse toBranchResponse(Branch branch) {
        return BranchResponse.builder()
                .name(branch.getName())
                .phoneNumber(branch.getPhoneNumber())
                .ManagerName(branch.getManagerName())
                .build();
    }

}
