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

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public ResponseEntity<?> saveProduct(ProductFormDTO p){
        Product newProduct = p.toModel();
        repository.save(newProduct);
        return new ResponseEntity<>(ProductFormDTO.fromModel(newProduct), HttpStatus.CREATED);
    }

    public ResponseEntity<Void> updateProduct(Long id, ProductFormDTO p, String userEmail){
        Optional<Product> productOptional = repository.findById(id);

        if (productOptional.isEmpty() || !productOptional.get().getUserEmail().equals(userEmail)){
            return ResponseEntity.notFound().build();
        }
        Product existingProduct = p.toModel();
        existingProduct.setId(id);
        existingProduct.setUserEmail(userEmail);
        existingProduct.setRegistrationDate(productOptional.get().getRegistrationDate());
        repository.save(existingProduct);
        return ResponseEntity.noContent().build();
    }

    public List<ProductFormDTO> listAllProducts(String name, String sku, String userEmail) {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        return repository.findByNameAndSku("%" + name + "%", "%" + sku + "%", userEmail, sort)
                .stream()
                .map(ProductFormDTO::fromModel)
                .toList();
    }

    public ResponseEntity<ProductFormDTO> getByIdProduct(Long id, String userEmail) {
        return repository.findById(id)
                .filter(product -> product.getUserEmail().equals(userEmail))
                .map(ProductFormDTO::fromModel)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public ResponseEntity<Object> deleteProduct(Long id, String userEmail){
        return repository.findById(id)
                .map(product -> {
                    if (!product.getUserEmail().equals(userEmail)){
                        return ResponseEntity.notFound().build();
                    }
                    repository.delete(product);
                    return ResponseEntity.noContent().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


}
