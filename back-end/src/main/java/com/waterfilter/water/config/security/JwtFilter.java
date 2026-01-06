package com.waterfilter.water.config.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtFilter extends OncePerRequestFilter{

    @Autowired
    private JwtService jwtService;

    @Autowired
    ApplicationContext context;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXZpbiIsImlhdCI6MTc1NzAxODE3MSwiZXhwIjoxNzU3MDE4Mjc5fQ.1ahExQ7AVsWp8nOkE4lRw9KOUllKNwM7dWz1Hxd9O0Y
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if(authHeader != null && authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7);
            username = jwtService.extractUserName(token);
        }



        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Extract authorities from token
            List<GrantedAuthority> authorities = 
                jwtService.extractAuthorities(token).stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());

            // Create UserDetails from token claims
            UserDetails userDetails = User.builder()
            .username(username)
            .password("")
            .authorities(authorities)
            .build();

            if (jwtService.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);

                request.setAttribute("userId", jwtService.extractUserId(token));
                request.setAttribute("userRoles", authorities);

            }
        }
        filterChain.doFilter(request, response);
    }

}
