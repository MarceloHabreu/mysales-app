package io.github.marcelohabreu.sales_api.controllers;

import io.github.marcelohabreu.sales_api.DTO.ProductFormDTO;
import io.github.marcelohabreu.sales_api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
    public ResponseEntity<?> create(@RequestBody ProductFormDTO p){
        return service.saveProduct(p);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody ProductFormDTO p) {
        return service.updateProduct(id,p);
    }

    @GetMapping
    public List<ProductFormDTO> list(
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "sku", required = false, defaultValue = "") String sku
    ){
        return service.listAllProducts(name, sku);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductFormDTO> getProduct(@PathVariable Long id){
        return service.getByIdProduct(id);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        return service.deleteProduct(id);
    }
}

