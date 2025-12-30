package com.waterfilter.water.Baranch;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BranchResponse {

    private String name;
    private String phoneNumber;
    private String ManagerName;

}
