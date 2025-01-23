package io.github.marcelohabreu.sales_api.controllers;

import io.github.marcelohabreu.sales_api.models.Sale;
import io.github.marcelohabreu.sales_api.repositories.ItemSaleRepository;
import io.github.marcelohabreu.sales_api.repositories.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin("*")
public class SaleController {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private ItemSaleRepository itemSaleRepository;

    @PostMapping
    @Transactional
    public void makingSale(@RequestBody Sale sale){
        saleRepository.save(sale);
        sale.getItems().forEach(is -> is.setSale(sale));
        itemSaleRepository.saveAll(sale.getItems());
    }
}
