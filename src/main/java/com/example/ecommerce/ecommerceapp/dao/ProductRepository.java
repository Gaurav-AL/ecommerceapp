package com.example.ecommerce.ecommerceapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.ecommerceapp.entity.Product;


public interface ProductRepository extends JpaRepository<Product, Long>{

}
