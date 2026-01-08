package com.waterfilter.water.Baranch;

import org.springframework.stereotype.Service;

import com.waterfilter.water.address.AddressWithLocationMapper;

@Service
public class BranchMapper {

    private AddressWithLocationMapper addressMapper;
    public BranchResponse toResponse(Branch branch) {
        return BranchResponse.builder()
                .id(branch.getBranchId())
                .name(branch.getName())
                .phoneNumber(branch.getPhoneNumber())
                .managerName(branch.getManagerName())
                .coverageRediusKm(branch.getCoverageRadiusKm())
                .addressResponse(addressMapper.toAddressResponse(branch.getAddress()))
                .build();
    }

}
