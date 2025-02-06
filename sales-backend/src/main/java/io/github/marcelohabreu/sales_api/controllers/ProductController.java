package io.github.marcelohabreu.sales_api.controllers;

import io.github.marcelohabreu.sales_api.DTO.ProductFormDTO;
import io.github.marcelohabreu.sales_api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductService service;

    private String encodeUserId(String userId){
        return URLEncoder.encode(userId, StandardCharsets.UTF_8);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ProductFormDTO p) {
        return service.saveProduct(p);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody ProductFormDTO p, String userId) {
        return service.updateProduct(id, p, encodeUserId(userId));
    }

    @GetMapping
    public List<ProductFormDTO> list(
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "sku", required = false, defaultValue = "") String sku,
            @RequestParam(value = "userId", required = false, defaultValue = "") String userId
    ) {
        return service.listAllProducts(name, sku, encodeUserId(userId));
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductFormDTO> getProduct(@PathVariable Long id, String userId) {
        return service.getByIdProduct(id, encodeUserId(userId));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id, String userId) {
        return service.deleteProduct(id, encodeUserId(userId));
    }
}

