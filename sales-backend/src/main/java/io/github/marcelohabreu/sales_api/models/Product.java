package io.github.marcelohabreu.sales_api.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sku;
    private String name;

    @Column(precision = 16, scale = 2)
    private BigDecimal price;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String userEmail;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate registrationDate;

    public Product() {
    }

    public Product(Long id, String sku, String name, BigDecimal price, String description, LocalDate registrationDate, String userEmail) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.description = description;
        this.registrationDate = registrationDate;
        this.userEmail = userEmail;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDate registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    @PrePersist
    public void prePersist(){
        setRegistrationDate(LocalDate.now());
    }
}
