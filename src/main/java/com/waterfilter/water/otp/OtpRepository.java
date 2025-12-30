package com.waterfilter.water.otp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Long>{

    List<Otp> findByUserIdAndVerifiedIsFalseAndExpiresAtBefore(Long userId, LocalDateTime now);

    Optional<Otp> findByCodeAndUserIdAndTypeAndVerifiedIsTrue(String code, Long userId, OtpType type);
    long countByUserEmailAndCreatedAtAfter(String email, LocalDateTime oneMinuteAgo);
    List<Otp> findByUserIdAndExpiresAtBefore(Long userId, LocalDateTime now);
    boolean existsByUserEmailAndTypeAndVerifiedIsTrueAndVerifiedAtAfter(String email, OtpType otpType,
        LocalDateTime afterTime);
    Optional<Otp> findByUserIdAndCodeAndType(Long userId, String otpCode, OtpType otpType);

    Optional<Otp> findByCodeAndUserIdAndTypeAndVerifiedIsFalseAndExpiresAtAfter(String code, Long id, OtpType type,
                LocalDateTime now);

    Optional<Otp> findByCodeAndUserIdAndTypeAndExpiresAtAfter(String code, Long id, OtpType type, LocalDateTime now);

    Optional<Otp> findByUserIdAndCodeAndTypeAndVerifiedIsTrue(Long id, String otpCode, OtpType passwordReset);
}
