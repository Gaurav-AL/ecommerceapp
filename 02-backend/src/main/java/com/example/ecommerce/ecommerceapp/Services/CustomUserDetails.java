package com.example.ecommerce.ecommerceapp.Services;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.ecommerce.ecommerceapp.entity.User;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    // Expose your User entity for additional fields
    public User getUser() {
        return user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Return authorities or roles (e.g., user.getRoles())
        return Collections.emptyList(); // Replace with actual roles if needed
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Update based on your application's requirements
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Update based on your application's requirements
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Update based on your application's requirements
    }


    public Long getId() {
        return user.getId();
    }

    @Override
    public boolean isEnabled() {
        return true; // Update based on your application's requirements
    }
}

