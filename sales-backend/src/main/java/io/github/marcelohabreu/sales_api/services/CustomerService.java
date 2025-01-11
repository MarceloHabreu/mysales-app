package io.github.marcelohabreu.sales_api.services;

import io.github.marcelohabreu.sales_api.DTO.CustomerRequestDTO;
import io.github.marcelohabreu.sales_api.models.Customer;
import io.github.marcelohabreu.sales_api.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository repository;

    public ResponseEntity<?> saveCustomer(CustomerRequestDTO c) {
        Customer newCustomer = c.toModel();
        Optional<Customer> emailExisting = repository.findByEmail(newCustomer.getEmail());
        if (emailExisting.isPresent()){
            return ResponseEntity.badRequest().body("Email already exist!");
        }
        repository.save(newCustomer);
        return new ResponseEntity<>(CustomerRequestDTO.fromModel(newCustomer), HttpStatus.CREATED);
    }

    public ResponseEntity<Void> updateCustomer(Long id, CustomerRequestDTO c) {
        Optional<Customer> customerOptional = repository.findById(id);
        if (customerOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Customer existingCustomer = c.toModel();
        existingCustomer.setId(id);
        existingCustomer.setRegistrationDate(customerOptional.get().getRegistrationDate());
        repository.save(existingCustomer);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<CustomerRequestDTO> getByIdCustomer(Long id) {
        return repository.findById(id)
                .map(CustomerRequestDTO::fromModel)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public ResponseEntity<Object> deleteCustomer(Long id){
        return repository.findById(id)
                .map(customer -> {
                    repository.delete(customer);
                    return ResponseEntity.noContent().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public List<CustomerRequestDTO> listAllCustomers(){
        return repository.findAll()
                .stream()
                .map(CustomerRequestDTO::fromModel)
                .collect(Collectors.toList());
    }
}
