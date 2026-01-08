package com.waterfilter.water.Baranch;

import com.waterfilter.water.address.AddressRequest;
import com.waterfilter.water.address.AddressWithLocationRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BranchRequest {

    private String name;
    private String phoneNumber;
    private String managerName;
    private double coverageRediusKm;
    private AddressWithLocationRequest branchAddress;
}
