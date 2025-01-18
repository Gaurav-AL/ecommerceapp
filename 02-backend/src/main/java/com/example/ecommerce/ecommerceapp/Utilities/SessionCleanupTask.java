package com.example.ecommerce.ecommerceapp.Utilities;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.ecommerce.ecommerceapp.dao.SessionRepository;

@Service
public class SessionCleanupTask {

    private final SessionRepository sessionRepository;

    public SessionCleanupTask(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    // Runs every day at midnight delete inactive session from session table
    @Scheduled(cron = "0 0 0 * * ?")
    public void cleanUpInactiveSessions() {
        sessionRepository.deleteInactiveSessions();
        System.out.println("Inactive sessions cleaned up successfully.");
    }
}
