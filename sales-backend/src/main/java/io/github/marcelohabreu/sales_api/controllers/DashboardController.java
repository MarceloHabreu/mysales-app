package io.github.marcelohabreu.sales_api.controllers;

import io.github.marcelohabreu.sales_api.models.Dashboard;
import io.github.marcelohabreu.sales_api.repositories.CustomerRepository;
import io.github.marcelohabreu.sales_api.repositories.ProductRepository;
import io.github.marcelohabreu.sales_api.repositories.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {


    @Autowired
    private SaleRepository sales;
    @Autowired
    private CustomerRepository customers;
    @Autowired
    private ProductRepository products;

    private String encodeUserId(String userId){
        return URLEncoder.encode(userId, StandardCharsets.UTF_8);
    }

    @GetMapping
    public Dashboard getDashboardData(@RequestParam(value = "userId") String userId){
        long salesCount = sales.countByUserId(encodeUserId((userId)));
        long customersCount = customers.countByUserId(encodeUserId(userId));
        long productsCount = products.countByUserId(encodeUserId(userId));

        var currentYear = LocalDate.now().getYear();
        var salesByMonth = sales.getSumSalesByMonth(currentYear, encodeUserId(userId));

        return new Dashboard(productsCount, customersCount, salesCount, salesByMonth);
    }
}
