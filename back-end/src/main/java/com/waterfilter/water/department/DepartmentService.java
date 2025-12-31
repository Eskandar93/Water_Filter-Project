package com.waterfilter.water.department;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.waterfilter.water.Baranch.Branch;
import com.waterfilter.water.Baranch.BranchRepository;
import com.waterfilter.water.exception.DublicateResourceException;
import com.waterfilter.water.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DepartmentService {

  private final DepartmentRepository departmentRepository;
  private final DepartmentMapper departmentMapper;
  private final BranchRepository branchRepository;

  public void addDepartment(DepartmentRequest departmentrequest){

    if(departmentRepository.findDepartmentByDepartmentId(departmentrequest.getDepartmentId()).isPresent()){
      throw new DublicateResourceException("Department has id: " + 
                departmentrequest.getDepartmentId()+ " already exist");
    }

     if(departmentRepository.findDepartmentByName(departmentrequest.getName()).isPresent()){
      throw new DublicateResourceException("Department has name: " + 
                departmentrequest.getName()+ " already exist");
    }

    Optional<Branch> branch = branchRepository.findBranchByBranchId(departmentrequest.getBranchId());
    if(!branch.isPresent()){
        throw new ResourceNotFoundException("Branch not found with id: "+ 
                departmentrequest.getBranchId());
    }  
    
    Department department = new Department();
    department.setName(departmentrequest.getName());
    department.setBranch(branch.get());

    departmentRepository.save(department);
  }

    // update
    public void updateDepartment(Long oldDepartmentId, DepartmentRequest departmentrequest){
      
      Optional<Department> exsistingDepartment = departmentRepository.findDepartmentByDepartmentId(oldDepartmentId);
      if(!exsistingDepartment.isPresent()){
        throw new ResourceNotFoundException("Department not found with id: " + oldDepartmentId);
      }
  
      Department department = exsistingDepartment.get();
      boolean hasChanges = false;

      if(departmentrequest.getBranchId() != null && !departmentrequest.getBranchId().equals(department.getBranch().getBranchId())){
        Optional<Branch> branch = branchRepository.findBranchByBranchId(departmentrequest.getBranchId() );
        if(!branch.isPresent()){
            throw new ResourceNotFoundException("Branch not found with id: "+ departmentrequest.getBranchId());
        }
        validateDepartmentNameUnique(departmentrequest.getName(), departmentrequest.getBranchId());
        department.setBranch(branch.get());
        hasChanges = true;
      }

      if(departmentrequest.getName() != null && !departmentrequest.getName().equals(department.getName())){
          validateDepartmentNameUnique(departmentrequest.getName(), departmentrequest.getBranchId());
          department.setName(departmentrequest.getName());
          hasChanges = true;
      }

      if(hasChanges){
        departmentRepository.save(department);
      }
    }
    private void validateDepartmentNameUnique(String name, Long branchId){
      Optional<Department> existingDepartment = departmentRepository.findDepartmentByNameAndBranch(name, branchId);
      if(existingDepartment.isPresent()){
        throw new DublicateResourceException("Department with name "+ name + "already exists in this branch");
      }
    }


  DepartmentResponse getDepartmentById(Long departmentId){

    Department existingDepartment = departmentRepository.findDepartmentByDepartmentId(departmentId)
    .orElseThrow(()-> new ResourceNotFoundException("Department not found with id: "+ departmentId));

    return departmentMapper.toDepartmentResponse(existingDepartment);
  }

  public List<DepartmentResponse> getAllDepartments(){

    List<Department> departments = departmentRepository.findAll();
    return departments.stream()
                        .map(departmentMapper::toDepartmentResponse)
                        .collect(Collectors.toList());
  }

  // delete
  public void deleteDepartmentById(Long departmentId){
    Optional<Department> department = departmentRepository.findDepartmentByDepartmentId(departmentId);
    if(!department.isPresent()){
      throw new ResourceNotFoundException("Department not found with id: " + departmentId);
    }

    if(department.isPresent() && department.get().getBranch() != null){
      department.get().setBranch(null);
    }
    
    departmentRepository.deleteById(departmentId);
  }
}
