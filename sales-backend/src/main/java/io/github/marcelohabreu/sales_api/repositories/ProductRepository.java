package io.github.marcelohabreu.sales_api.repositories;

import io.github.marcelohabreu.sales_api.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
