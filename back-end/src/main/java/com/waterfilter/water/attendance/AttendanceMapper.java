package com.waterfilter.water.attendance;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttendanceMapper {

  public AttendanceResponse toAttendanceResponse(Attendance attendance){
    return AttendanceResponse.builder()
    .id(attendance.getId())
    .employeeId(attendance.getEmployee().getId())
    .employeeUsername(attendance.getEmployee().getUsername())
    .branchName(attendance.getBranch().getName())
    .attendanceDate(attendance.getAttendanceDate())
    .checkInTime(attendance.getCheckInTime())
    .attendanceStatus(attendance.getAttendanceStatus())
    .attendanceStatusEvaluation(attendance.getAttendanceStatusEvaluation())
    .lateMinutes(attendance.getLateMinutes())
    .build();
  }
}
