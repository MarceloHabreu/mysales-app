package io.github.marcelohabreu.sales_api.repositories;

import io.github.marcelohabreu.sales_api.models.ItemSale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemSaleRepository extends JpaRepository<ItemSale, Long> {
}
