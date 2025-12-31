package com.waterfilter.water.otp;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import com.waterfilter.water.exception.InvalidOtpException;
import com.waterfilter.water.exception.TooManyRequestsException;
import  com.waterfilter.water.user.Users;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OtpService {

    private static final int OTP_LENGTH = 6;
    private static final int OTP_EXPIRATION_MINUTES = 5;
    private static final int MAX_OTP_ATTEMPTS = 3;

    private final OtpRepository otpRepository;

    public String generateOtp() {
        // Generate a 6-digit numeric OTP
        Random random = new Random();
        StringBuilder otp = new StringBuilder();

        for(int i=0; i<OTP_LENGTH; i++) {
            otp.append(random.nextInt(10));
        }

        return otp.toString();
    }

    public Otp createOtp(Users user, OtpType type) {

        if (hasTooManyRecentRequests(user.getEmail())) {
            throw new TooManyRequestsException("Too many OTP requests. Please wait 1 minute.");
        }
        // Clean up expired OTPs for this user
        cleanUpExpiredOtps(user.getId());

        // Generate and save new OTP
        String code = generateOtp();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiresAt = now.plusMinutes(OTP_EXPIRATION_MINUTES);

        Otp otp = new Otp();
        otp.setCode(code);
        otp.setCreatedAt(now);
        otp.setExpiresAt(expiresAt);
        otp.setVerified(false);
        otp.setType(type);
        otp.setUser(user);
        otp.setAttempt(0);

        return otpRepository.save(otp);
    }

    @Transactional
    public Otp validateAndVerifyOtp(String otpCode, OtpType type) {
        
        LocalDateTime now = LocalDateTime.now();
        Otp otp = otpRepository.findByCodeAndTypeAndVerifiedIsFalseAndExpiresAtAfter(otpCode, type, now)
        .orElseThrow(()-> new InvalidOtpException("Invalid or expired OTP"));

        // Check attempts
        if(otp.getAttempt() >= MAX_OTP_ATTEMPTS){
            otp.setVerified(true);
            otpRepository.save(otp);
            throw new InvalidOtpException("Too many attempts. OTP is now invalid.");
        }

         // Check if code matches
        if(otp.getCode().equals(otpCode)){
            // Valid OTP
            otp.setVerified(true);
            otp.setVerifiedAt(LocalDateTime.now());
            otpRepository.save(otp);
            return otp;
        }else {
            // Wrong code - increment attempts
            otp.setAttempt(otp.getAttempt()+1);
            if (otp.getAttempt() >= MAX_OTP_ATTEMPTS) {
                otp.setVerified(true);
            }

            otpRepository.save(otp);

            int remainingAttempts = MAX_OTP_ATTEMPTS - otp.getAttempt();
            String message = remainingAttempts > 0
            ? "Invalid OTP. You have " + remainingAttempts + " attempt(s) left."
            : "Too many attempts. OTP is now invalid try after 1 minute.";

            throw new InvalidOtpException(message);
        }
    }

    // Max 3 requests per minute
    private boolean hasTooManyRecentRequests(String email){
        LocalDateTime oneMinuteAgo = LocalDateTime.now().minusMinutes(1);
        long recentRequests = otpRepository.countByUserEmailAndCreatedAtAfter(email, oneMinuteAgo);
        return recentRequests >= 3; 
    }

    // Check if OTP was recently verified for password reset
    public boolean isOtpRecentlyVerified(String email, OtpType otpType){
        LocalDateTime tenMinutesAgo = LocalDateTime.now().minusMinutes(10);
        return otpRepository.existsByUserEmailAndTypeAndVerifiedIsTrueAndVerifiedAtAfter(email, otpType, tenMinutesAgo);
    }

    private void cleanUpExpiredOtps(Long userId) {
        LocalDateTime now = LocalDateTime.now();
        List<Otp> expiredOtps = otpRepository.findByUserIdAndExpiresAtBefore(userId, now);
        otpRepository.deleteAll(expiredOtps);
    }
}
