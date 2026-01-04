package com.waterfilter.water.attendance;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckInRequest {

    private Long employeeId;
    private String ipAddress;
    private String deviceId;
}
