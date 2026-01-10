package com.waterfilter.water.Baranch;

import org.springframework.stereotype.Service;

import com.waterfilter.water.address.AddressWithLocationMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BranchMapper {

    private final AddressWithLocationMapper addressMapper;
    public BranchResponse toResponse(Branch branch) {
        return BranchResponse.builder()
                .id(branch.getId())
                .name(branch.getName())
                .phoneNumber(branch.getPhoneNumber())
                .managerName(branch.getManagerName())
                .coverageRediusKm(branch.getCoverageRadiusKm())
                .addressResponse(addressMapper.toAddressResponse(branch.getAddress()))
                .build();
    }

}
