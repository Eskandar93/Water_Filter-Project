// package com.waterfilter.water.config.security;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.AuthenticationProvider;
// import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// import org.springframework.security.config.Customizer;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

// @Configuration // this is a configuration class, meaning it contains @Bean methods
// @EnableWebSecurity //  enables Spring Security's web security support
// public class SecurityConfig {


//     @Autowired
//     private UserDetailsService userDetailsService;

//     @Autowired
//     private JwtFilter jwtFilter;

//     // securityFilterChain method defines the security rules for HTTP requests
//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//         // return the object of security filter chain by build function
//         return http
//                 .csrf(customizer -> customizer.disable()) // do not use session but use token
//                 .authorizeHttpRequests(request -> request
//                         .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
//                         .requestMatchers("/api/v1/users/**").permitAll()
//                         // .requestMatchers( "/api/v1/users/register", "/api/v1/users/login").permitAll()
//                         .requestMatchers("/api/v1/users/employees/**", "/api/v1/users/customers/**").hasAnyRole("ADMIN", "HR")
//                         .requestMatchers("/api/v1/branches/**", "/api/v1/departments/**", "/api/v1/insurances/**").hasRole("ADMIN")

//                         .anyRequest().authenticated()) // no one can access the page without authentication
//                 //.formLogin(Customizer.withDefaults())
//                 .httpBasic(Customizer.withDefaults())
//                 .sessionManagement(session ->
//                         session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //  not to create or use an HTTP session to store the user's security context. with each request return new session id
//                 .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class) // add filter before the authentication filter
//                 .build();
//     }

//     @Bean
//     public AuthenticationProvider authenticationProvider() {
//         DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
//         //provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance()); not use the hash
//         provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
//         //provider.setUserDetailsService(userDetailsService);
//         return provider;
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder(12);
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//         return config.getAuthenticationManager();
//     }
// }


package com.waterfilter.water.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/users/register", "/api/v1/users/login").permitAll()
                        .requestMatchers("/api/v1/users/employees/**", "/api/v1/users/customers/**").hasAnyRole("ADMIN", "HR")
                        .requestMatchers("/api/v1/branches/**", "/api/v1/departments/**", "/api/v1/insurances/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",
            "http://localhost:3001", 
            "http://127.0.0.1:3000"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // ====== CHOOSE ONE OF THESE authenticationProvider() METHODS ======
    
    // OPTION 1: Try this first (for older Spring Security)
    /*
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        // Try to set userDetailsService - if this method doesn't exist, use Option 2
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
    */
    
    // OPTION 2: If Option 1 fails (for newer Spring Security)
    /*
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        // Just set password encoder, userDetailsService is set automatically
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
    */
    
    // OPTION 3: If both fail, SKIP this bean entirely - Let Spring auto-configure it
    // Comment out or delete the entire authenticationProvider() method
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}