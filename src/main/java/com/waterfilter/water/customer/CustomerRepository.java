package com.waterfilter.water.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query(name = CustomerConstants.FIND_CUSTOMER_BY_PHONENUMBER)
    Optional<Customer> findCustomerByPhoneNumber(@Param("phoneNumber") String phoneNumber);

    @Query(name = CustomerConstants.FIND_CUSTOMER_BY_TOTALNAME)
    Optional<Customer> findCustomerByTotalName(@Param("firstName") String firstName,
                                               @Param("middleName") String middleName,
                                               @Param("lastName") String lastName);
}
