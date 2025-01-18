package com.example.ecommerce.ecommerceapp.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "session")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_id",nullable = false)
    private Long sessionId;

    @Column(name = "user_id",nullable = false)
    private Long userId;

    @Column(name = "token",nullable = false)
    private String token;

    @Column(name = "issued_at",nullable = false)
    private LocalDateTime issuedAt;

    @Column(name = "expires_at",nullable = false)
    private LocalDateTime expiresAt;

    @Column(name = "is_active",nullable = false)
    private Boolean isActive;

    @Column(name = "date_created", updatable = false)
    private LocalDateTime dateCreated;

    @Column(name = "last_updated", updatable = false)
    private LocalDateTime lastUpdated;

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(LocalDateTime issuedAt) {
        this.issuedAt = issuedAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Boolean getIsRevoked() {
        return isRevoked;
    }

    public void setIsRevoked(Boolean isRevoked) {
        this.isRevoked = isRevoked;
    }

    @Column(nullable = false)
    private Boolean isRevoked;

    /*Automatically Updated is_active column */
    @PrePersist
    @PreUpdate
    public void updateIsActive() {
        this.isActive = LocalDateTime.now().isAfter(issuedAt)
                && LocalDateTime.now().isBefore(expiresAt)
                && !isRevoked;
    }

    
    
}
