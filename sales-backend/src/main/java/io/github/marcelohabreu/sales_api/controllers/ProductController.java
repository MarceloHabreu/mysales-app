package io.github.marcelohabreu.sales_api.controllers;

import io.github.marcelohabreu.sales_api.DTO.ProductRequestDTO;
import io.github.marcelohabreu.sales_api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductService service;

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductRequestDTO p){
        return service.save(p);
    }
}
