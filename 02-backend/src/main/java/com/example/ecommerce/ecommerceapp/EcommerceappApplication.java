package com.example.ecommerce.ecommerceapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication// Enable Scheduling a Job like deleting inactive sessions
@EnableScheduling
public class EcommerceappApplication {
	public static void main(String[] args) {
		SpringApplication.run(EcommerceappApplication.class, args);
	}

}
