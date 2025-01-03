package io.github.marcelohabreu.sales_api.services;

import io.github.marcelohabreu.sales_api.DTO.ProductRequestDTO;
import io.github.marcelohabreu.sales_api.models.Product;
import io.github.marcelohabreu.sales_api.repositories.ProductRepository;  // Certifique-se de ter o import correto
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public ResponseEntity<?> save(ProductRequestDTO p){
        Product product = new Product();
        product.setSku(p.sku());
        product.setPrice(p.price());
        product.setName(p.name());
        product.setDescription(p.description());
        product.setRegistrationDate(p.registration());
        return new ResponseEntity<>(repository.save(product), HttpStatus.CREATED);
    }
}
