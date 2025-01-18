package com.example.ecommerce.ecommerceapp.Services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ecommerce.ecommerceapp.dao.SessionRepository;
import com.example.ecommerce.ecommerceapp.entity.Session;

@Service
public class SessionService {

    /* Helpful in logout Feature */
    @Autowired
    private SessionRepository sessionRepository;


    public void createSession(Long userId, String token, LocalDateTime issuedAt, LocalDateTime expiresAt) {
        Session session = new Session();
        session.setUserId(userId);
        session.setToken(token);
        session.setIssuedAt(issuedAt);
        session.setExpiresAt(expiresAt);
        session.setIsActive(true); // New session is active by default
        session.setIsRevoked(false); // New session is not revoked
        sessionRepository.save(session);
    }

    @Transactional
    public void revokeSession(Long sessionId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> {
                    throw new IllegalArgumentException("Session not found.");
                });
        session.setIsRevoked(true);
        sessionRepository.save(session);
    }

    public void logoutSession(String token) {
        Session session = sessionRepository.findByToken(token);
        if (session == null) {
            throw new RuntimeException("Session not found.");
        }      
        session.setIsRevoked(true);
        session.setIsActive(false);
        sessionRepository.save(session);
    }
}
