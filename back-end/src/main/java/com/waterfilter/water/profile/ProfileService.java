package com.waterfilter.water.profile;

import org.springframework.stereotype.Service;

import com.waterfilter.water.employee.Employee;
import com.waterfilter.water.employee.EmployeeRepository;
import com.waterfilter.water.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileService {

  private final EmployeeRepository employeeRepository;
  private final ProfileMapper profileMapper;
    public ProfileResponse getCurrentUserProfile(Long userId) {
        Employee employee = employeeRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("user with id: " + userId + " not found"));

        return profileMapper.toProfileResponse(employee);
    }

    
}
