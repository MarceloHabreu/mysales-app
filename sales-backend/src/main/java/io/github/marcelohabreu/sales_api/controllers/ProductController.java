package io.github.marcelohabreu.sales_api.controllers;

import io.github.marcelohabreu.sales_api.DTO.ProductRequestDTO;
import io.github.marcelohabreu.sales_api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PutMapping("{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductRequestDTO p) {
        return service.update(id,p);
    }

    @GetMapping
    public List<ProductRequestDTO> list(){
//        try {
//            Thread.sleep(2000);
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        }
        return service.listAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductRequestDTO> getProduct(@PathVariable Long id){
        return service.getById(id);
    }
}

