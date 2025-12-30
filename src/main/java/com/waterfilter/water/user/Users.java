package com.waterfilter.water.user;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.waterfilter.water.common.BaseAuditingEntity;
import com.waterfilter.water.otp.Otp;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name ="users")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user_category", discriminatorType = DiscriminatorType.STRING)

@NamedQuery(name = UserConstants.FIND_USER_BY_IDENTIFIER,
    query = "SELECT u FROM Users u WHERE u.username = :identifier OR u.email = :identifier OR u.phoneNumber = :identifier")
public abstract class Users extends BaseAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String username;
    private String email;
    private String password;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Enumerated(EnumType.STRING)
    private UserType userType;

    // private boolean passwordResetRequired = false;
    private LocalDateTime lastPasswordReset;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Otp> otps = new ArrayList<>();
    
}
