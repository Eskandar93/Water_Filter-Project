package com.waterfilter.water.resetPassword;

import java.time.LocalDateTime;
import java.util.UUID;

import com.waterfilter.water.user.Users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "reset_tokens")
@NoArgsConstructor
@AllArgsConstructor
public class ResetToken {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String token;
    
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private Users user;
    
  @Column(nullable = false)
  private LocalDateTime createdAt;
    
  @Column(nullable = false)
  private LocalDateTime expiresAt;
    
  @Column(nullable = false)
  private boolean used = false;
    
  @Column
  private LocalDateTime usedAt;

  public ResetToken(Users user, int validityMintues){
    this.token = UUID.randomUUID().toString();
    this.user = user;
    this.createdAt = LocalDateTime.now();
    this.expiresAt = LocalDateTime.now().plusMinutes(validityMintues);
  }

  public boolean isValid(){
    return !used && expiresAt.isAfter(LocalDateTime.now());
  }

}
