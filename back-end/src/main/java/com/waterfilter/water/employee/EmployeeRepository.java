package com.waterfilter.water.employee;

import com.waterfilter.water.attendance.Attendance;
import com.waterfilter.water.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query(name = EmployeeConstants.FIND_USER_BY_EMAIL)
    Optional<Users> findByEmail(@Param("email") String userEmail);

    @Query(name = EmployeeConstants.FIND_USER_BY_PHONENUMBER)
    Optional<Users> findUserByPhoneNumber(@Param("phoneNumber") String phoneNumber);

    @Query(name = EmployeeConstants.FIND_USER_BY_ID)
    Optional<Users> findByUserId(@Param("userId") Long userId);

    Optional<Employee> findByUsername(String name);

}
