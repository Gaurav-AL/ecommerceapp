package com.example.ecommerce.ecommerceapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.ecommerce.ecommerceapp.entity.Session;
import java.util.List;


@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    // Find by session id method
    Session findBySessionId(Long sessionId);

    //Find by token method
    Session findByToken(String token);

    @Transactional
    @Modifying
    @Query("DELETE FROM Session s WHERE s.isActive = false")
    void deleteInactiveSessions();
}

