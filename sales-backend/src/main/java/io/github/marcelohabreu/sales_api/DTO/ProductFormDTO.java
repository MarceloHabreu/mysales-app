package io.github.marcelohabreu.sales_api.DTO;


import com.fasterxml.jackson.annotation.JsonFormat;
import io.github.marcelohabreu.sales_api.models.Product;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ProductFormDTO(
        Long id, String sku,
        String name,
        String description,
        BigDecimal price,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate registrationDate) {


    public Product toModel() {
        return new Product(
                id,
                sku,
                name,
                price,
                description,
                registrationDate
        );
    }

    public static ProductFormDTO fromModel(Product p) {
        return new ProductFormDTO(p.getId(), p.getSku(), p.getName(),p.getDescription(),p.getPrice(),
                 p.getRegistrationDate());
    }

}
