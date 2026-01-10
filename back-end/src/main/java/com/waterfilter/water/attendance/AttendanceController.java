package com.waterfilter.water.attendance;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.waterfilter.water.apiResponse.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/attendances/")
public class AttendanceController {
  
  private final AttendanceService attendanceService;

  @PostMapping("register-attendance")
  public ResponseEntity<ApiResponse<String>> registerAttendance(@RequestBody CheckInRequest request){
    attendanceService.registerAttendance(request);
    ApiResponse<String> response = ApiResponse.success( "Attendance registered successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("date/{employeeId}")
  public ResponseEntity<ApiResponse<AttendanceResponse>> getEmployeeAttendanceByIdAndDate(@PathVariable Long employeeId, @RequestParam LocalDate date){
    AttendanceResponse response = attendanceService.getEmployeeByIdAttendanceForDate(employeeId, date);
    ApiResponse<AttendanceResponse> apiResponse = ApiResponse.success(response, "Attendance for date and employee id retrieved");
    return ResponseEntity.ok(apiResponse);
  }

  @GetMapping("date/{phoneNumber}")
  public ResponseEntity<ApiResponse<AttendanceResponse>> getEmployeeAttendanceByPhoneNumberAndDate(@RequestParam String phoneNumber, @RequestParam LocalDate date){
    AttendanceResponse response = attendanceService.getEmployeeByPhoneNumberAttendanceForDate(phoneNumber, date);
    ApiResponse<AttendanceResponse> apiResponse = ApiResponse.success(response, "Attendance for date and phone number retrieved");
    return ResponseEntity.ok(apiResponse);
  }

  @GetMapping("date/{branchId}")
  public ResponseEntity<ApiResponse<List<AttendanceResponse>>> getEmployeesAttendanceByBranchIdForDate(@PathVariable Long branchId, @RequestParam LocalDate date){
    List<AttendanceResponse> response = attendanceService.getEmployeesAttendanceByBranchIdForDate(branchId, date);
    ApiResponse<List<AttendanceResponse>> apiResponse = ApiResponse.success(response, "Attendance for date and branchId retrieved");
    return ResponseEntity.ok(apiResponse);
  }

  @GetMapping("date")
  public ResponseEntity<ApiResponse<List<AttendanceResponse>>> getAllEmployeeAttendanceForDate(@RequestParam LocalDate date){
    List<AttendanceResponse> response = attendanceService.getAllEmployeeAttendanceForDate(date);
    ApiResponse<List<AttendanceResponse>> apiResponse = ApiResponse.success(response, "Attendance for date retrieved");
    return ResponseEntity.ok(apiResponse);
  }

  @PostMapping("absent/{employeeId}")
  public ResponseEntity<ApiResponse<String>> markAbsent(@PathVariable Long employeeId, @RequestParam LocalDate localDate,@RequestParam String reason){
    attendanceService.markAbsent(employeeId, localDate, reason);
    ApiResponse<String> response = ApiResponse.success(reason, "Employee marked as absent successfully");
    return ResponseEntity.ok(response);
  }
}
