package io.github.marcelohabreu.sales_api.DTO;


import java.math.BigDecimal;
import java.time.LocalDate;

public record ProductFormDTO(
        String sku,
        String name,
        String description,
        BigDecimal price,
        LocalDate registration) {

}
