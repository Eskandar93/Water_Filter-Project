package com.waterfilter.water.employee;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.waterfilter.water.Baranch.Branch;
import com.waterfilter.water.Baranch.BranchRepository;
import com.waterfilter.water.address.Address;
import com.waterfilter.water.address.AddressMapper;
import com.waterfilter.water.address.AddressRequest;
import com.waterfilter.water.department.Department;
import com.waterfilter.water.department.DepartmentRepository;
import com.waterfilter.water.exception.DublicateResourceException;
import com.waterfilter.water.exception.ResourceNotFoundException;
import com.waterfilter.water.insurance.Insurance;
import com.waterfilter.water.insurance.InsuranceRepository;
import com.waterfilter.water.user.UserRole;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    private final DepartmentRepository departmentRepository;
    private final BranchRepository branchRepository;
    private final InsuranceRepository insuranceRepository;
    private final AddressMapper addressMapper;
    private final PasswordEncoder passwordEncoder;
//    private final PasswordEncoder passwordEncoder;

    // add
    public void addEmployee(EmployeeRequest employeeRequest) {

        if (employeeRepository.findByEmail(employeeRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Employee already exists");
        }

        Employee employee = employeeMapper.toEntity(employeeRequest);

        // 3. Set relationships
        setEmployeeRelationships(employee, employeeRequest);

        employeeRepository.save(employee);
    }

    private void setEmployeeRelationships(Employee employee, EmployeeRequest employeeRequest){
                //set department to employee
        if(employeeRequest.getDepartmentId() != null) {
            Department department = departmentRepository.findDepartmentByDepartmentId(employeeRequest.getDepartmentId())
            .orElseThrow(() -> new ResourceNotFoundException("Department with id " + employeeRequest.getDepartmentId() + " not found"));
            employee.setDepartment(department);
        }

        //set branch to employee
        if(employeeRequest.getBranchId() != null) {
            Branch branch = branchRepository.findBranchByBranchId(employeeRequest.getBranchId())
            .orElseThrow(() -> new ResourceNotFoundException("Branch with id " + employeeRequest.getBranchId() + " not found"));
            employee.setEmployeeBranch(branch);
        }

        //set address to employee
        if(employeeRequest.getAddressRequest() != null){
            Address address = addressMapper.toEntity(employeeRequest.getAddressRequest());
            employee.setEmployeeAddresses(address);
        }

        //set insurance to employee
        if(employeeRequest.getInsuranceIds() != null && !employeeRequest.getInsuranceIds().isEmpty()){
            employee.setInsurances(validateAllInsuranceIdsExists(employeeRequest.getInsuranceIds()));
        }
        
        // set salary to employee
        if(employeeRequest.getSalary() != null && employeeRequest.getRole() == UserRole.ADMIN){
            employee.setSalary(employeeRequest.getSalary());
        }
    }

    public void updateEmployee(Long oldEmployeeId, EmployeeRequest employeeRequest) {

        Employee exsistingEmployee = employeeRepository.findById(oldEmployeeId)
        .orElseThrow(() -> new ResourceNotFoundException("Employee with id: " + oldEmployeeId + " not exist"));
        
        // Validate unique fields (if changed)
        validateUniqueFields(exsistingEmployee, employeeRequest);

        // Update basic fields with null checks
        updateBasicFields(exsistingEmployee, employeeRequest);

        // Update relationships
        updateRelationships(exsistingEmployee, employeeRequest);

        employeeRepository.save(exsistingEmployee);
    }


    private void validateUniqueFields(Employee exsistingEmployee, EmployeeRequest employeeRequest) {
        if(employeeRequest.getEmail() != null && !exsistingEmployee.getEmail().equals(employeeRequest.getEmail())){
            employeeRepository.findByEmail(employeeRequest.getEmail()).ifPresent(
                emp -> {
                    if(!emp.getId().equals(exsistingEmployee.getId())){
                        throw new DublicateResourceException("Email already in use: " + employeeRequest.getEmail());
                    }
                }
            );
        }

        if(employeeRequest.getPhoneNumber() != null && !exsistingEmployee.getPhoneNumber().equals(employeeRequest.getPhoneNumber())){
            employeeRepository.findUserByPhoneNumber(employeeRequest.getPhoneNumber()).ifPresent(
                emp -> {
                    if(!emp.getId().equals(exsistingEmployee.getId())){
                        throw new DublicateResourceException("Phone Number already in use: " + employeeRequest.getPhoneNumber());
                    }
                }
            );
        }
    }
    private void updateBasicFields(Employee exsistingEmployee, EmployeeRequest employeeRequest) {
        if(employeeRequest.getFirstName() != null){exsistingEmployee.setFirstName(employeeRequest.getFirstName());}
        if(employeeRequest.getMiddleName() != null){exsistingEmployee.setMiddleName(employeeRequest.getMiddleName());}
        if(employeeRequest.getLastName() != null){exsistingEmployee.setLastName(employeeRequest.getLastName());}
        if(employeeRequest.getEmail() != null){exsistingEmployee.setEmail(employeeRequest.getEmail());}
        if(employeeRequest.getUsername() != null){exsistingEmployee.setUsername(employeeRequest.getUsername());}
        if(employeeRequest.getPhoneNumber() != null){exsistingEmployee.setPhoneNumber(employeeRequest.getPhoneNumber());}
        if(employeeRequest.getPassword() != null){exsistingEmployee.setPassword(passwordEncoder.encode(employeeRequest.getPassword()));}
        
        // Update role
        if(employeeRequest.getRole() != null && !employeeRequest.getRole().equals(exsistingEmployee.getUserRole())){
            exsistingEmployee.setUserRole(employeeRequest.getRole());
        }

        // Update type
        if(employeeRequest.getType() != null && !employeeRequest.getType().equals(exsistingEmployee.getUserType())){
            exsistingEmployee.setUserType(employeeRequest.getType());
        }

        // Update salary
        if(employeeRequest.getSalary() != null && exsistingEmployee.getSalary() != employeeRequest.getSalary() ){
            exsistingEmployee.setSalary(employeeRequest.getSalary());
        }
    }

    private void updateRelationships(Employee exsistingEmployee, EmployeeRequest employeeRequest) {

        // Update address
        if(employeeRequest.getAddressRequest() != null){
            updateAddress(exsistingEmployee, employeeRequest.getAddressRequest());
        }

        // Update branch
        if(employeeRequest.getBranchId() != null){
            Branch branch = branchRepository.findBranchByBranchId(employeeRequest.getBranchId())
            .orElseThrow(() -> new ResourceNotFoundException("Branch with Id: " + employeeRequest.getBranchId() + " not exist"));

            exsistingEmployee.setEmployeeBranch(branch);
        }

        // Update department
        if(employeeRequest.getDepartmentId() != null){
            Department department = departmentRepository.findDepartmentByDepartmentId(employeeRequest.getDepartmentId())
            .orElseThrow(() -> new ResourceNotFoundException("Branch with Id: " + employeeRequest.getBranchId() + " not exist"));

            exsistingEmployee.setDepartment(department);
        }

        if(employeeRequest.getInsuranceIds() != null){
            updateInsurances(exsistingEmployee, employeeRequest.getInsuranceIds());
        }

    }

    private void updateAddress(Employee exsistingEmployee, AddressRequest addressRequest) {
        Address exsistingAddress = exsistingEmployee.getEmployeeAddresses();

        if(exsistingAddress == null){
            Address address = addressMapper.toEntity(addressRequest);
            exsistingEmployee.setEmployeeAddresses(address);
        }
        else {
            addressMapper.updateAddress(exsistingAddress, addressRequest);
        }
    }

    private void updateInsurances(Employee exsistingEmployee, List<Long> insuranceIds) {
        if(insuranceIds.isEmpty()){
            exsistingEmployee.setInsurances(new ArrayList<>());
            return;
        }

        exsistingEmployee.setInsurances(validateAllInsuranceIdsExists(insuranceIds));
    }

    private List<Insurance> validateAllInsuranceIdsExists(List<Long> insuranceIds){
        List<Insurance> insurances = insuranceRepository.findAllById(insuranceIds);
            
            if(insurances.size() != insuranceIds.size()){
                List<Long> foundsIds = insurances.stream()
                                                    .map(Insurance::getInsuranceId)
                                                    .collect(Collectors.toList());

                List<Long> missingIds = insuranceIds.stream()
                                                                        .filter(id -> !foundsIds.contains(id))
                                                                        .collect(Collectors.toList());                                    
                throw new ResourceNotFoundException("Insurance IDs not found: " + missingIds);
            }

            return insurances;
    }

    public EmployeeResponse getEmployeeById(Long employeeId){
        Employee existingEmployee = employeeRepository.findById(employeeId)
        .orElseThrow(() -> new ResourceNotFoundException("Employee with id: " + employeeId + " not exist"));

        return employeeMapper.toEmployeeResponse(existingEmployee);
    }
    public List<EmployeeResponse> getAllEmployees(){
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                            .map(employeeMapper::toEmployeeResponse)
                            .collect(Collectors.toList());
    }

    public void deleteEmployeeById(Long employeeId){
        if(!employeeRepository.existsById(employeeId)){
            throw new ResourceNotFoundException("Employee with id: " + employeeId + " not exist");
        }
        employeeRepository.deleteById(employeeId);
    }
}
