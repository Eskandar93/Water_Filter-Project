package com.waterfilter.water.department;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long>{

  @Query(name = DepartmentConstants.FIND_DEPARTMENT_BY_DEPARTMENTID)
  Optional<Department> findDepartmentByDepartmentId(@Param("departmentId") Long departmentId);
  
    @Query(name = DepartmentConstants.FIND_DEPARTMENT_BY_NAME)
  Optional<Department> findDepartmentByName(@Param("departmentName") String departmentName);

  @Query(name = DepartmentConstants.FIND_DEPARTMENTS_BY_BRANCH)
  Optional<List<Department>> findDepartmentsByBranch(@Param("branchId") Long branchId);

  @Query(name = DepartmentConstants.FIND_DEPARTMENT_BY_NAME_And_BRANCH)
  Optional<Department> findDepartmentByNameAndBranch(@Param("departmentName") String departmentName, @Param("branchId") Long branchId);

  @Query(name = DepartmentConstants.FIND_DEPARTMENT_BY_DEPARTMENTID_And_BRANCH)
  Optional<Department> findDepartmentByDepartmentIdAndBranch(@Param("departmentId") Long departmentId, @Param("branchId") Long branchId);
}
