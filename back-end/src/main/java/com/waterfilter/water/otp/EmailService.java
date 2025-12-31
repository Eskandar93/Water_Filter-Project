package com.waterfilter.water.otp;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final Environment env;

    public void sendOtpEmail(String toEmail, String otpCode) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(env.getProperty("spring.mail.username"));
        message.setTo(toEmail);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP code is: " + otpCode + "\nThis code will expire in 5 minutes.");
        mailSender.send(message);
    }

    // Simple email confirmation
    public void sendPasswordChangedConfirmation(String toEmail, String username){
        try{    
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(env.getProperty("spring.mail.username"));
                message.setTo(toEmail);
                message.setSubject("Password Changed Successfully");
                message.setText(String.format(
                    "Hello %s,\n\n" +
                    "Your password has been changed successfully on %s.\n\n" +
                    "Best regards,\n" +
                    "Your App Team",
                    username, LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"))
                ));
                mailSender.send(message);

        }catch(Exception e){

        System.out.println("Failed to send password change confirmation email "+ e);
        // log.error("Failed to send password change confirmation email", e);
        }
  }

}