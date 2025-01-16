package io.github.marcelohabreu.sales_api.controllers;

import io.github.marcelohabreu.sales_api.DTO.CustomerFormDTO;
import io.github.marcelohabreu.sales_api.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    CustomerService service;

    @GetMapping
    public Page<CustomerFormDTO> list(
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "cpf", required = false, defaultValue = "") String cpf,
            Pageable pageable){
        return service.listAllCustomers(name,cpf,pageable);
    }

    @GetMapping("{id}")
    public ResponseEntity<CustomerFormDTO> getCustomer(@PathVariable Long id){
        return service.getByIdCustomer(id);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CustomerFormDTO c){
        return service.saveCustomer(c);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody CustomerFormDTO c){
        return service.updateCustomer(id,c);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        return service.deleteCustomer(id);
    }
}
