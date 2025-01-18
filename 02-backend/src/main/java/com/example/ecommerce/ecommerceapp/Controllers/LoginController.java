package com.example.ecommerce.ecommerceapp.Controllers;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.ecommerceapp.Services.CustomUserDetails;
// import com.example.ecommerce.ecommerceapp.Services.CustomUserDetails;
import com.example.ecommerce.ecommerceapp.Services.CustomUserDetailsService;
import com.example.ecommerce.ecommerceapp.Services.SessionService;
// import com.example.ecommerce.ecommerceapp.Services.UserDetailsServiceImpl;
import com.example.ecommerce.ecommerceapp.Utilities.JwtUtil;
import com.example.ecommerce.ecommerceapp.dao.UserRepository;
import com.example.ecommerce.ecommerceapp.entity.User;

@RestController
@RequestMapping("/api/auth")
public class LoginController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private SessionService sessionService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        try {
            // Authenticate user
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

            // Load user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            if (userDetails instanceof CustomUserDetails) {
                User user = ((CustomUserDetails) userDetails).getUser(); // Get full user entity

                // Generate JWT token
                String jwt = jwtUtil.generateToken(user.getEmail());

                // Create session
                try{
                    sessionService.createSession(user,jwt, LocalDateTime.now(),LocalDateTime.now().plusHours(10));
                }catch(Exception e){
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
                }
                // Return response
                return ResponseEntity.ok(Map.of(
                        "token", jwt,
                        "userId", user.getId(),
                        "email", user.getEmail(),
                        "name", user.getFirstName()));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User details could not be retrieved");
            }
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/logout")
    public Map<String, String> logout(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        sessionService.logoutSession(token);
        return Map.of("message", "Logged out successfully");
    }
}
