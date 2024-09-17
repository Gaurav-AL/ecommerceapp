package com.example.ecommerce.ecommerceapp.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.ecommerce.ecommerceapp.entity.Product;

@RepositoryRestResource(collectionResourceRel = "product", path = "products")
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long>{

    /*
     * Behind the scene hibernate convert it to SQL query
     */
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);


    /*
     * Below is Custom query to allow case insensitive search to my product table
     */
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);

}
