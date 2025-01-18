package com.example.ecommerce.ecommerceapp.dao;

import com.example.ecommerce.ecommerceapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    // Find by Email method
    Optional<User> findByEmail(@Param("email") String email);

    // Find by Mobile number method
    Optional<User> findByContactNo(@Param("contact_no") Long contactNo); // Optional to used isPresent() method, it's more readable
}

