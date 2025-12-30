package com.waterfilter.water.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration // this is a configuration class, meaning it contains @Bean methods
@EnableWebSecurity //  enables Spring Security's web security support
public class SecurityConfig {


    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtFilter jwtFilter;

    // securityFilterChain method defines the security rules for HTTP requests
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // return the object of security filter chain by build function
        return http
                .csrf(customizer -> customizer.disable()) // do not use session but use token
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers("/api/v1/users/**").permitAll()
                        // .requestMatchers( "/api/v1/users/register", "/api/v1/users/login").permitAll()
                        .requestMatchers("/api/v1/users/employees/**", "/api/v1/users/customers/**").hasAnyRole("ADMIN", "HR")
                        .requestMatchers("/api/v1/branches/**", "/api/v1/departments/**", "/api/v1/insurances/**").hasRole("ADMIN")

                        .anyRequest().authenticated()) // no one can access the page without authentication
                //.formLogin(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //  not to create or use an HTTP session to store the user's security context. with each request return new session id
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class) // add filter before the authentication filter
                .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        //provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance()); not use the hash
        provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        //provider.setUserDetailsService(userDetailsService);
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
