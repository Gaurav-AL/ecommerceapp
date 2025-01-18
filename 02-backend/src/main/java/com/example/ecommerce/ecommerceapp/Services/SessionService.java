package com.example.ecommerce.ecommerceapp.Services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ecommerce.ecommerceapp.dao.SessionRepository;
import com.example.ecommerce.ecommerceapp.entity.Session;
import com.example.ecommerce.ecommerceapp.entity.User;
import com.example.ecommerce.ecommerceapp.dao.UserRepository;

@Service
public class SessionService {

    /* Helpful in logout Feature */
    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;


    public void createSession(User user, String token, LocalDateTime issuedAt, LocalDateTime expiresAt) {

        User user_ = userRepository.findByID(user.getId());
        if(user_ == null)
            throw new RuntimeException("User Not Found with Id :" + user.getId());
        // Create a new Session and set its fields
        Session session = new Session();
        session.setToken(token);
        session.setIssuedAt(issuedAt);
        session.setExpiresAt(expiresAt);
        session.setDateCreated(LocalDateTime.now());
        session.setIsActive(true); // New session is active by default
        session.setIsRevoked(false); // New session is not revoked

        // Associate the session with the user
        session.setUser(user_);

        // Save the session
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
