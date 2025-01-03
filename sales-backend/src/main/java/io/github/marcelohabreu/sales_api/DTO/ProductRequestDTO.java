package io.github.marcelohabreu.sales_api.DTO;


import java.math.BigDecimal;
import java.time.LocalDate;

public record ProductRequestDTO(
        String sku,
        String name,
        String description,
        BigDecimal price,
        LocalDate registration) {

}
