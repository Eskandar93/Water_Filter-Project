package com.waterfilter.water.config.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

// import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
// import java.security.NoSuchAlgorithmException;
// import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtService {


//    private String secretKey = "";
//
//    public JwtService(){
//        try {
//            KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacSHA256");
//            SecretKey sk = keyGenerator.generateKey();
//            secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
//        } catch (NoSuchAlgorithmException e) {
//            throw new RuntimeException(e);
//        }
//    }

    private final String secretKey;

    // Option A: Use application.properties
    public JwtService(@Value("${jwt.secret:my-default-super-secure-secret-key-1234567890}") String secretKey) {
        this.secretKey = secretKey;
    }

    public String generateToken(String username) {

        Map<String, Object> claims = new HashMap<>();
        // Store authorities in the right format
    // List<Map<String, String>> authoritiesList = userDetails.getAuthorities().stream()
    //     .map(auth -> {
    //         Map<String, String> authMap = new HashMap<>();
    //         authMap.put("authority", auth.getAuthority());
    //         return authMap;
    //     })
    //     .collect(Collectors.toList());
    
    // claims.put("authorities", authoritiesList);
        // claims.put("authorities", userDetails.getAuthorities()); // ✅ THIS IS IMPORTANT!

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 60 * 60 * 30*5 *20))
                .and()
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUserName(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build().parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUserName(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }

    //     // Add this method to extract authorities from token
    // public Collection<? extends GrantedAuthority> extractAuthorities(String token) {
    //     Claims claims = extractAllClaims(token);
    //     Object authoritiesObj = claims.get("authorities");
        
    //     if (authoritiesObj == null) {
    //         return Collections.emptyList();
    //     }
        
    //     System.out.println("DEBUG: Authorities from token (raw): " + authoritiesObj);
    //     System.out.println("DEBUG: Authorities class: " + authoritiesObj.getClass());
        
    //     List<GrantedAuthority> authorities = new ArrayList<>();
        
    //     if (authoritiesObj instanceof List) {
    //         List<?> list = (List<?>) authoritiesObj;
    //         for (Object obj : list) {
    //             if (obj instanceof Map) {
    //                 Map<?, ?> map = (Map<?, ?>) obj;
    //                 Object authority = map.get("authority");
    //                 if (authority instanceof String) {
    //                     authorities.add(new SimpleGrantedAuthority((String) authority));
    //                 }
    //             } else if (obj instanceof String) {
    //                 authorities.add(new SimpleGrantedAuthority((String) obj));
    //             }
    //         }
    //     }
        
    //     System.out.println("DEBUG: Parsed authorities: " + authorities);
    //     return authorities;
    // }
}
