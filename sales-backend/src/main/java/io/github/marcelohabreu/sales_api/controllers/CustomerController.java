package io.github.marcelohabreu.sales_api.controllers;

import io.github.marcelohabreu.sales_api.DTO.CustomerRequestDTO;
import io.github.marcelohabreu.sales_api.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    CustomerService service;

    @GetMapping
    public List<CustomerRequestDTO> list(){
        return service.listAllCustomers();
    }

    @GetMapping("{id}")
    public ResponseEntity<CustomerRequestDTO> getCustomer(@PathVariable Long id){
        return service.getByIdCustomer(id);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CustomerRequestDTO c){
        return service.saveCustomer(c);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody CustomerRequestDTO c){
        return service.updateCustomer(id,c);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        return service.deleteCustomer(id);
    }
}
