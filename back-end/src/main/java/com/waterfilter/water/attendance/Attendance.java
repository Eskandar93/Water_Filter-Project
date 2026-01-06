package com.waterfilter.water.attendance;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.waterfilter.water.Baranch.Branch;
import com.waterfilter.water.common.BaseAuditingEntity;
import com.waterfilter.water.employee.Employee;
import com.waterfilter.water.location.Location;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "attendances")
public class Attendance extends BaseAuditingEntity{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private LocalDateTime checkInTime;
  private LocalDate attendanceDate;

  @Enumerated(EnumType.STRING)
  private AttendanceStatus attendanceStatus;

  @Enumerated(EnumType.STRING)
  private AttendanceStatusEvaluation attendanceStatusEvaluation; // "ON_TIME", "LATE"
  
  private String ipAddress;
  private String deviceId;
  private Integer lateMinutes;

  // employee
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "employee_id", nullable = false)
  private Employee employee;

  // branch
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "branch_id", nullable = false)
  private Branch branch;

  @Embedded
  private Location location;

  @PrePersist
  @PreUpdate
  public void evaluateAttendanceStatus(){
    if (checkInTime != null) {
      LocalTime checkIn = checkInTime.toLocalTime();
      LocalTime expectedStart = LocalTime.of(9, 0);
      if(checkIn.isAfter(expectedStart)){
        this.attendanceStatusEvaluation = AttendanceStatusEvaluation.LATE;
        this.lateMinutes = (int) Duration.between(expectedStart, checkIn).toMinutes();
      }
      else {
        this.attendanceStatusEvaluation = AttendanceStatusEvaluation.ON_TIME;
        this.lateMinutes = 0;
      }
    }
  }
}
