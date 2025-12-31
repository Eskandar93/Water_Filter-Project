package com.waterfilter.water.common;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.waterfilter.water.employee.Employee;
import com.waterfilter.water.user.UserRepository;
import com.waterfilter.water.user.UserRole;
import com.waterfilter.water.user.UserType;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminInit implements CommandLineRunner{

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  
  @Override
  public void run(String... args) throws Exception {

    // add admin
    if (userRepository.findByUsername("admin").isEmpty()) {
            Employee admin = new Employee();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@company.com");
            admin.setPhoneNumber("+1234567890");
            admin.setFirstName("System");
            admin.setLastName("Administrator");
            admin.setUserRole(UserRole.ADMIN);
            admin.setUserType(UserType.ADMIN);
            admin.setEmployeeCode("ADMIN001");
            admin.setHireDate(LocalDate.now());
            
            userRepository.save(admin);
            System.out.println("Admin user created successfully!");
        }

         if (userRepository.findByUsername("alex").isEmpty()) {
            Employee admin = new Employee();
            admin.setUsername("alex");
            admin.setPassword(passwordEncoder.encode("alex123"));
            admin.setEmail("eskandermina93@gmail.com");
            admin.setPhoneNumber("+1234567892");
            admin.setFirstName("Owner");
            admin.setLastName("Owner2");
            admin.setUserRole(UserRole.ADMIN);
            admin.setUserType(UserType.ADMIN);
            admin.setEmployeeCode("ADMIN001");
            admin.setHireDate(LocalDate.now());
            
            userRepository.save(admin);
            System.out.println("Admin user created successfully!");
        }


      // add hr
      if (userRepository.findByUsername("hr").isEmpty()) {
            Employee hr = new Employee();
            hr.setUsername("hr");
            hr.setPassword(passwordEncoder.encode("hr123"));
            hr.setEmail("hr@company.com");
            hr.setPhoneNumber("+1234567891");
            hr.setFirstName("HR");
            hr.setLastName("Manager");
            hr.setUserRole(UserRole.HR);
            hr.setUserType(UserType.EMPLOYEE);
            hr.setEmployeeCode("HR001");
            hr.setHireDate(LocalDate.now());
            
            userRepository.save(hr);
            System.out.println("HR user created successfully!");
        }

    // throw new UnsupportedOperationException("AdminInit method s 'run'");
  }

}
