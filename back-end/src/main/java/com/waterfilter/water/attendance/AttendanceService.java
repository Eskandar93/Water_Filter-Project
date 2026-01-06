package com.waterfilter.water.attendance;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.waterfilter.water.employee.Employee;
import com.waterfilter.water.employee.EmployeeRepository;
import com.waterfilter.water.exception.BusinessException;
import com.waterfilter.water.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttendanceService {

  private final EmployeeRepository employeeRepository;
  private final AttendanceRepository attendanceRepository;
  private final AttendanceMapper attendanceMapper;
  public void registerAttendance(CheckInRequest request){
    Employee employee = findEmployeeById(request.getEmployeeId());
    
    LocalDate today = LocalDate.now();
    validateNoExistingAttendance(request.getEmployeeId(), today);

    if(employee.getEmployeeBranch() == null){
      throw new BusinessException("Employee is not assigned to any branch");
    }

    // Create attendance record
    Attendance attendance = Attendance.builder()
    .employee(employee)
    .branch(employee.getEmployeeBranch())
    .attendanceDate(today)
    .checkInTime(LocalDateTime.now())
    .attendanceStatus(AttendanceStatus.PRESENT)
    .ipAddress(request.getIpAddress())
    .deviceId(request.getDeviceId())
    .build();

    // evalute attendance status (On-time , late)
    attendance.evaluateAttendanceStatus();

    attendanceRepository.save(attendance);
  }

  public AttendanceResponse getEmployeeAttendanceForDate(Long employeeId, LocalDate date){
    findEmployeeById(employeeId);

    Attendance attendance = attendanceRepository.findByEmployeeIdAndAttendanceDate(employeeId, date)
      .orElseThrow(()-> new BusinessException("No attendance record found for date: " + date + " for employee id: " + employeeId));
    
    return attendanceMapper.toAttendanceResponse(attendance);
  }

    public List<AttendanceResponse> getAllEmployeeAttendanceForDate(LocalDate date){

    List<Attendance> attendances = attendanceRepository.findByAttendanceDate(date);

    if(attendances.isEmpty()){
      throw new BusinessException("No any attendance record found for date: " + date);
    } 

    return attendances.stream()
                          .map(attendanceMapper::toAttendanceResponse)
                          .collect(Collectors.toList());
  }

  public void markAbsent(Long employeeId, LocalDate date, String reason){
    Employee employee = findEmployeeById(employeeId);

    validateNoExistingAttendance(employeeId, date);

       // Create attendance record
    Attendance attendance = Attendance.builder()
    .employee(employee)
    .branch(employee.getEmployeeBranch())
    .attendanceDate(date)
    .attendanceStatus(AttendanceStatus.ABSENT)
    // here we need to access Ip Address, Device id from user that is login and try to access this end-point
    // .ipAddress(request.getIpAddress())
    // .deviceId(request.getDeviceId())

    .build();

    attendanceRepository.save(attendance);
  }

  public Employee findEmployeeById(Long employeeId){
    return employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee with id: " + employeeId + " not exist"));
  }

  private void validateNoExistingAttendance(Long employeeId, LocalDate date){
    if(attendanceRepository.findByEmployeeIdAndAttendanceDate(employeeId, date).isPresent()){
      throw new BusinessException("Attendance already marked for employeeId: " + employeeId + " on date: " + date);
    }
  }

}
