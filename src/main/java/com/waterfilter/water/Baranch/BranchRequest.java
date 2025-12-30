package com.waterfilter.water.Baranch;

import com.waterfilter.water.address.AddressRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BranchRequest {

    private Long branchId;
    private String name;
    private String phoneNumber;
    private String ManagerName;
    private AddressRequest branchAddress;
}
