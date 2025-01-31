package io.github.marcelohabreu.sales_api.models;


import io.github.marcelohabreu.sales_api.repositories.projections.SaleByMonth;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Dashboard {

    private Long products;
    private Long customers;
    private Long sales;
    private List<SaleByMonth> salesByMonth;

    public Dashboard(Long products, Long customers, Long sales, List<SaleByMonth> salesByMonth) {
        this.products = products;
        this.customers = customers;
        this.sales = sales;
        this.salesByMonth = salesByMonth;
        this.populateMissingMonths();
    }

    public Long getProducts() {
        return products;
    }

    public void setProducts(Long products) {
        this.products = products;
    }

    public Long getCustomers() {
        return customers;
    }

    public void setCustomers(Long customers) {
        this.customers = customers;
    }

    public Long getSales() {
        return sales;
    }

    public void setSales(Long sales) {
        this.sales = sales;
    }

    public List<SaleByMonth> getSalesByMonth() {
        if (salesByMonth == null) {
            salesByMonth = new ArrayList<>();
        }
        return salesByMonth;
    }

    public void setSalesByMonth(List<SaleByMonth> salesByMonth) {
        this.salesByMonth = salesByMonth;
    }

    public void populateMissingMonths() {

        // Taking the current month (maximum month)
        Integer maximumMonth = getSalesByMonth()
                .stream()
                .mapToInt(SaleByMonth::getMonth)
                .max()
                .getAsInt();

        // Creating a list of all months from 1 to the maximum month
        List<Integer> listMonths = IntStream.rangeClosed(1, maximumMonth)
                .boxed()
                .collect(Collectors.toList());

        // Getting the months that have already been added
        List<Integer> monthsAdded = getSalesByMonth()
                .stream()
                .map(SaleByMonth::getMonth)
                .collect(Collectors.toList());

        // For each month in the list of all months
        listMonths.stream().forEach(month -> {
            // If the month is not in the list of added months
            if (!monthsAdded.contains(month)) {
                // Creating a new instance of SaleByMonth with value zero
                SaleByMonth saleByMonth = new SaleByMonth() {
                    @Override
                    public Integer getMonth() {
                        return month;
                    }

                    @Override
                    public BigDecimal getValue() {
                        return BigDecimal.ZERO;
                    }
                };
                // Adding the new month to the sales by month list
                getSalesByMonth().add(saleByMonth);
            }
        });

        // Sorting the sales by month list
        getSalesByMonth().sort(Comparator.comparing(SaleByMonth::getMonth));
    }
}
