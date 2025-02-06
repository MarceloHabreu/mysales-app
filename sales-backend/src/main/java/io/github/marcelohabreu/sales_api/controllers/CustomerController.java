package io.github.marcelohabreu.sales_api.controllers;

import io.github.marcelohabreu.sales_api.DTO.CustomerFormDTO;
import io.github.marcelohabreu.sales_api.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    CustomerService service;

    private String encodeUserId(String userId){
        return URLEncoder.encode(userId, StandardCharsets.UTF_8);
    }

    @GetMapping
    public Page<CustomerFormDTO> list(
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "cpf", required = false, defaultValue = "") String cpf,
            @RequestParam(value = "userId", required = false, defaultValue = "") String userId,
            Pageable pageable){
        return service.listAllCustomers(name,cpf,encodeUserId(userId),pageable);
    }

    @GetMapping("{id}")
    public ResponseEntity<CustomerFormDTO> getCustomer(@PathVariable Long id, String userId){
        return service.getByIdCustomer(id, encodeUserId(userId));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CustomerFormDTO c){
        return service.saveCustomer(c);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody CustomerFormDTO c, String userId){
        return service.updateCustomer(id,c, encodeUserId(userId));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id, String userId){
        return service.deleteCustomer(id, encodeUserId(userId));
    }
}
