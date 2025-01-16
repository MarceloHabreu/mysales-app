package io.github.marcelohabreu.sales_api.services;

import io.github.marcelohabreu.sales_api.DTO.ProductFormDTO;
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

    public ResponseEntity<?> save(ProductFormDTO p){
        System.out.println("Recebido: " + p);
        Product newProduct = p.toModel();
        repository.save(newProduct);
        return new ResponseEntity<>(ProductFormDTO.fromModel(newProduct), HttpStatus.CREATED);
    }

    public ResponseEntity<?> update(Long id, ProductFormDTO p){
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

    public List<ProductFormDTO> listAll() {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "id")).stream()
                .map(product -> new ProductFormDTO(
                        product.getId(),
                        product.getSku(),
                        product.getName(),
                        product.getDescription(),
                        product.getPrice(),
                        product.getRegistrationDate()
                ))
                .collect(Collectors.toList());
    }

    public ResponseEntity<ProductFormDTO> getById(Long id) {
        Optional<Product> productOptional = repository.findById(id);

        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            ProductFormDTO productDTO = new ProductFormDTO(
                    product.getId(),
                    product.getSku(),
                    product.getName(),
                    product.getDescription(),
                    product.getPrice(),
                    product.getRegistrationDate()
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
