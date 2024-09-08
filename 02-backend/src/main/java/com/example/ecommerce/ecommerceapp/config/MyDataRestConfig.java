package com.example.ecommerce.ecommerceapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.example.ecommerce.ecommerceapp.entity.Product;
import com.example.ecommerce.ecommerceapp.entity.ProductCategory;


@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{
    
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors){

            HttpMethod[] theUnsupportedMethods = {HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST};

            // Disable the method for Product PUT, POST and DELETE

            config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedMethods))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedMethods));

            // Disable the method for ProductCategory PUT, POST and DELETE
            config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedMethods))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedMethods));

    }
}
