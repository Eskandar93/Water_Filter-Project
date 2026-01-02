package com.waterfilter.water.Baranch;

import com.waterfilter.water.address.AddressRequest;
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
    private AddressRequest branchAddress;
}
