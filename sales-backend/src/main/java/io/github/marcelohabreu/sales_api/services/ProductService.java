package io.github.marcelohabreu.sales_api.services;

import io.github.marcelohabreu.sales_api.DTO.ProductRequestDTO;
import io.github.marcelohabreu.sales_api.models.Product;
import io.github.marcelohabreu.sales_api.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        product.setRegistration(p.registration());
        return new ResponseEntity<>(repository.save(product), HttpStatus.CREATED);
    }

    public ResponseEntity<?> update(Long id, ProductRequestDTO p){
        Optional<Product> productOptional = repository.findById(id);

        if (productOptional.isPresent()){
            Product existingProduct = productOptional.get();
            existingProduct.setName(p.name());
            existingProduct.setDescription(p.description());
            existingProduct.setSku(p.sku());
            existingProduct.setPrice(p.price());

            repository.save(existingProduct);
            return ResponseEntity.ok().build();
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    public List<ProductRequestDTO> listAll() {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "id")).stream()
                .map(product -> new ProductRequestDTO(
                        product.getId(),
                        product.getSku(),
                        product.getName(),
                        product.getDescription(),
                        product.getPrice(),
                        product.getRegistration()
                ))
                .collect(Collectors.toList());
    }

    public ResponseEntity<ProductRequestDTO> getById(Long id) {
        Optional<Product> productOptional = repository.findById(id);

        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            ProductRequestDTO productDTO = new ProductRequestDTO(
                    product.getId(),
                    product.getSku(),
                    product.getName(),
                    product.getDescription(),
                    product.getPrice(),
                    product.getRegistration()
            );
            return ResponseEntity.ok(productDTO);
        }

        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<?> delete(Long id){
        Optional<Product> productOptional = repository.findById(id);
        if (productOptional.isPresent()){
            Product productExistent = productOptional.get();
            repository.delete(productExistent);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
