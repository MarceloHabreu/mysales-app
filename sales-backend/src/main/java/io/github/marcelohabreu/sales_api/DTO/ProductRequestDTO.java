package io.github.marcelohabreu.sales_api.DTO;


import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ProductRequestDTO(
        Long id, String sku,
        String name,
        String description,
        BigDecimal price,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate registration) {

}
