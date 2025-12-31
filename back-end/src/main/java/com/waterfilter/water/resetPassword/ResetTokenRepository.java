package com.waterfilter.water.resetPassword;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResetTokenRepository extends JpaRepository<ResetToken, Long>{

  Optional<ResetToken> findByTokenAndUsedIsFalseAndExpiresAtAfter(String token, LocalDateTime now);

  Optional<ResetToken> findByUserIdAndUsedIsFalseAndExpiresAtAfter(Long userId, LocalDateTime now);

  void deleteByExpiresAtBefore(LocalDateTime now);
}
