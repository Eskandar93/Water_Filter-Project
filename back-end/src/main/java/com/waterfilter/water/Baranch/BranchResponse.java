package com.waterfilter.water.Baranch;

import com.waterfilter.water.address.AddressResponse;
import com.waterfilter.water.address.AddressWithLocationResponse;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BranchResponse {

    private Long id;
    private String name;
    private String phoneNumber;
    private String managerName;
    private double coverageRediusKm;
    private AddressWithLocationResponse addressResponse;
}
