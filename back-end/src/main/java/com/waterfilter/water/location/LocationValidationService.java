package com.waterfilter.water.location;

import org.springframework.stereotype.Service;

import com.waterfilter.water.Baranch.Branch;
import com.waterfilter.water.Baranch.BranchRepository;
import com.waterfilter.water.address.Address;
import com.waterfilter.water.address.AddressRepository;
import com.waterfilter.water.employee.Employee;
import com.waterfilter.water.employee.EmployeeRepository;
import com.waterfilter.water.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationValidationService {

  private final LocationService locationService;
  private final LocationMapper locationMapper;
  private final AddressRepository addressRepository;
  private final EmployeeRepository employeeRepository;

  public LocationValidationResponse isEmployeeWithinBranchCoverage(LocationValidationRequest request){

    Employee employee = employeeRepository.findById(request.getEmployeeId())
        .orElseThrow(() -> new ResourceNotFoundException("Employee with id: " + request.getEmployeeId() + " not exist"));

    Branch branch = employee.getEmployeeBranch();
    if(branch == null){
        return locationMapper.locationValidationFaild("Employee is not assigned to any branch");
    }

    Address branchAddress = branch.getAddress();
    if(branchAddress == null){
        return locationMapper.locationValidationFaild("Branch  is not configured to any address");
    }

    Location locationAddress = branchAddress.getLocation();
      if(locationAddress == null){
        return locationMapper.locationValidationFaild("Branch address is not configured to any location");
    }

    double coverageRadius = branch.getCoverageRediusKm(); 
    
    // Calculate distance between request location and branch
    boolean isValid = addressRepository.isEmployeeWithinBranchCoverageNative(request.getEmployeeId(), request.getLatitude(), request.getLongitude(), coverageRadius);
    double distance = 0.0;
    
    if(!isValid){
       distance = locationService.calculateDistance(request.getLatitude(), request.getLongitude(), locationAddress.getLatitude(), locationAddress.getLongitude());
    }

    if(isValid == false || distance > coverageRadius){
      return locationMapper.locationValidationFaild(
                    String.format(
                      "You are %.2f km away from %s. Maximum allowed distance: %.2f km",
                      distance, branch.getName(), coverageRadius
                    ));
    }

    return locationMapper.locationValidationSuccess("Location validated successfully. You can now register attendance.");
  }
}
