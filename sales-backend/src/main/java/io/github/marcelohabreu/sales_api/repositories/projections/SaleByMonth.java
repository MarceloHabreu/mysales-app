package io.github.marcelohabreu.sales_api.repositories.projections;

import java.math.BigDecimal;

// projection
public interface SaleByMonth {

    Integer getMonth();
    BigDecimal getValue();
}
