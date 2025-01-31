package io.github.marcelohabreu.sales_api.controllers;

import io.github.marcelohabreu.sales_api.models.Dashboard;
import io.github.marcelohabreu.sales_api.repositories.CustomerRepository;
import io.github.marcelohabreu.sales_api.repositories.ProductRepository;
import io.github.marcelohabreu.sales_api.repositories.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {


    @Autowired
    private SaleRepository sales;
    @Autowired
    private CustomerRepository customers;
    @Autowired
    private ProductRepository products;

    @GetMapping
    public Dashboard getDashboardData(){
        long salesCount = sales.count();
        long customersCount = customers.count();
        long productsCount = products.count();

        var currentYear = LocalDate.now().getYear();
        var salesByMonth = sales.getSumSalesByMonth(currentYear);

        return new Dashboard(productsCount, customersCount, salesCount, salesByMonth);
    }
}
