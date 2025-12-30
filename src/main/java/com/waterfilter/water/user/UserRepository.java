package com.waterfilter.water.user;


import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<Users, Long>{

  Optional<Users> findByUsername(String username);
  Optional<Users> findByEmail(String email);
  Optional<Users> findByPhoneNumber(String phoneNumber);


  @Query(name = UserConstants.FIND_USER_BY_IDENTIFIER)
  Optional<Users> findByIdentifier(@Param("identifier") String identifier);
  boolean existsByLastPasswordResetAfterAndEmail(LocalDateTime tenMinutesAgo, String email);
}
