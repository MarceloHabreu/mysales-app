package io.github.marcelohabreu.sales_api.controllers;

import io.github.marcelohabreu.sales_api.models.Dashboard;
import io.github.marcelohabreu.sales_api.repositories.CustomerRepository;
import io.github.marcelohabreu.sales_api.repositories.ProductRepository;
import io.github.marcelohabreu.sales_api.repositories.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public Dashboard getDashboardData(@RequestParam(value = "userEmail") String userEmail){
        long salesCount = sales.countByUserEmail(userEmail);
        long customersCount = customers.countByUserEmail(userEmail);
        long productsCount = products.countByUserEmail(userEmail);

        var currentYear = LocalDate.now().getYear();
        var salesByMonth = sales.getSumSalesByMonth(currentYear, userEmail);

        return new Dashboard(productsCount, customersCount, salesCount, salesByMonth);
    }
}
