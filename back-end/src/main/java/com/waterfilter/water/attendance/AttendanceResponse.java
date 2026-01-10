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
    private String firstName;
    private String middleName;
    private String lastName;
    private String phoneNumber;
    private String branchName;
    private String departmentName;
    
    private LocalDate attendanceDate;
    
    private LocalDateTime checkInTime;

    private AttendanceStatus attendanceStatus;
    private AttendanceStatusEvaluation attendanceStatusEvaluation;
    private Integer lateMinutes;
}
