package com.waterfilter.water.attendance;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttendanceMapper {

  public AttendanceResponse toAttendanceResponse(Attendance attendance){
    return AttendanceResponse.builder()
    .id(attendance.getId())
    .firstName(attendance.getEmployee().getFirstName())
    .middleName(attendance.getEmployee().getMiddleName())
    .lastName(attendance.getEmployee().getLastName())
    .phoneNumber(attendance.getEmployee().getPhoneNumber())
    .branchName(attendance.getBranch().getName())
    .departmentName(attendance.getEmployee().getDepartment().getName())
    .attendanceDate(attendance.getAttendanceDate())
    .checkInTime(attendance.getCheckInTime())
    .attendanceStatus(attendance.getAttendanceStatus())
    .attendanceStatusEvaluation(attendance.getAttendanceStatusEvaluation())
    .lateMinutes(attendance.getLateMinutes())
    .build();
  }
}
