package com.waterfilter.water.location;

import org.springframework.stereotype.Service;

import com.waterfilter.water.Baranch.Branch;
import com.waterfilter.water.address.Address;
import com.waterfilter.water.employee.Employee;
import com.waterfilter.water.employee.EmployeeRepository;
import com.waterfilter.water.exception.BusinessException;
import com.waterfilter.water.exception.InvalidLocationException;
import com.waterfilter.water.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationValidationService {

  private final LocationService locationService;
  private final EmployeeRepository employeeRepository;

  public LocationValidationResponse validateEmployeeLocation(LocationValidationRequest request){

    Employee employee = findEmployee(request.getEmployeeId());

    Branch branch = validateBranchAssignment(employee);

    Address branchAddress = validateBranchAddress(branch);

    Location branchLocation = validateBranchLocation(branchAddress);

    double coverageRadius = branch.getCoverageRadiusKm();

    Double distance = calculateDistance(request, branchLocation);

    validateDistance(distance, coverageRadius, branch.getName());

    return LocationValidationResponse.success("Location validated successfully.", distance, coverageRadius);
  }

    private Employee findEmployee(Long employeeId){
    return employeeRepository.findById(employeeId)
        .orElseThrow(() -> new ResourceNotFoundException("Employee with id: " + employeeId + " not exist"));
  }

  private Branch validateBranchAssignment(Employee employee){
    
    Branch branch = employee.getEmployeeBranch();
    if(branch == null){
        throw new BusinessException("Employee is not assigned to any branch");
    }
    return branch;
  }

  private Address validateBranchAddress(Branch branch){
     Address address = branch.getAddress();
    if(address == null){
        throw new BusinessException("Branch  is not configured to any address");
    }
    return address;
  }

  private Location validateBranchLocation(Address address){
      Location location = address.getLocation();
      if(location == null || location.getLatitude() == null || location.getLongitude() == null){
        throw new BusinessException("Branch address is not configured to any location");
    }
    return location;
  }

  private double calculateDistance(LocationValidationRequest request, Location branchLocation){
    return locationService.calculateDistance(request.getLatitude(), request.getLongitude(), branchLocation.getLatitude(), branchLocation.getLongitude());
  }

  private void validateDistance(double distance, double coverageRadius, String branchName){
        if(distance > coverageRadius){
      throw new InvalidLocationException(
                    String.format(
                      "You are %.2f km away from %s. Maximum allowed distance: %.2f km",
                      distance, branchName, coverageRadius
                    ), 
                      distance, 
                      coverageRadius
                    );
    }
  }
}
