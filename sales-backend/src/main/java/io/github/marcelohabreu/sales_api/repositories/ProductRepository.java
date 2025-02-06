package io.github.marcelohabreu.sales_api.repositories;

import io.github.marcelohabreu.sales_api.models.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE " +
            "upper(p.name) LIKE upper(:name) AND " +
            "upper(p.sku) LIKE upper(:sku) AND " +
            "p.userId = :userId")
    List<Product> findByNameAndSku(
            @Param("name") String name,
            @Param("sku") String sku,
            @Param("userId") String userId,
            Sort sort
    );

    @Query(value = "select count(*) from product where user_id = :userId", nativeQuery = true)
    Long countByUserId(@Param("userId") String userId);
}
