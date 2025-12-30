package com.waterfilter.water.department;

import com.waterfilter.water.Baranch.Branch;
import com.waterfilter.water.employee.Employee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "department")

@NamedQuery(name = DepartmentConstants.FIND_DEPARTMENT_BY_DEPARTMENTID,
query = "Select d From Department d Where d.departmentId = :deparmentId")

@NamedQuery(name = DepartmentConstants.FIND_DEPARTMENT_BY_NAME,
query = "Select d From Department d Where d.name = :departmentName")

@NamedQuery(name = DepartmentConstants.FIND_DEPARTMENTS_BY_BRANCH, 
    query = "Select d From Department d Where d.branch.branchId = :branchId")  
    
@NamedQuery(name = DepartmentConstants.FIND_DEPARTMENT_BY_NAME_And_BRANCH,
query = "Select d From Department d Where d.name = :departmentName And d.branch.branchId = :branchId")

@NamedQuery(name = DepartmentConstants.FIND_DEPARTMENT_BY_DEPARTMENTID_And_BRANCH,
query = "Select d From Department d Where d.departmentId = :departmentId And d.branch.branchId = :branchId")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long departmentId;

    private String name;

    @OneToMany(mappedBy = "department")
    private List<Employee> employees;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch branch;
}
