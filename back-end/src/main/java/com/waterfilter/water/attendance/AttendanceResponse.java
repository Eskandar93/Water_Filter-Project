package com.waterfilter.water.attendance;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceResponse {
  
    private Long id;
    private Long employeeId;
    private String employeeUsername;
    private String branchName;
    
    private LocalDate attendanceDate;
    
    private LocalDateTime checkInTime;

    private AttendanceStatus attendanceStatus;
    private AttendanceStatusEvaluation attendanceStatusEvaluation;
    private Integer lateMinutes;
}
