package com.waterfilter.water.insurance;

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
@Table(name = "insurance")

@NamedQuery(name = InsuranceConstants.FIND_INSURANCE_BY_INSURANCEID, 
query = "Select i From Insurance i where i.insuranceId = :insuranceId")

@NamedQuery(name = InsuranceConstants.FIND_INSURANCE_BY_INSURANCETYPE,
query = "Select i From Insurance i where i.insuranceType = :insuranceType")

@NamedQuery(name = InsuranceConstants.FIND_INSURANCE_BY_INSURANCEID_AND_INSURANCETYPE,
query = "Select i From Insurance i where i.insuranceId = :insuranceId And i.insuranceType = :insuranceType")
public class Insurance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long insuranceId;

    @Enumerated(EnumType.STRING)
    private InsuranceType insuranceType;

    @ManyToMany(mappedBy = "insurances", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<Employee> employees;
}
