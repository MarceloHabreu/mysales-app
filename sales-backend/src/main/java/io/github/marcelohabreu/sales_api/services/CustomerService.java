package io.github.marcelohabreu.sales_api.services;

import io.github.marcelohabreu.sales_api.DTO.CustomerFormDTO;
import io.github.marcelohabreu.sales_api.models.Customer;
import io.github.marcelohabreu.sales_api.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository repository;

    public ResponseEntity<?> saveCustomer(CustomerFormDTO c) {
        Customer newCustomer = c.toModel();
        Optional<Customer> emailExisting = repository.findByEmail(newCustomer.getEmail());
        if (emailExisting.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exist!");
        }
        repository.save(newCustomer);
        return new ResponseEntity<>(CustomerFormDTO.fromModel(newCustomer), HttpStatus.CREATED);
    }

    public ResponseEntity<Void> updateCustomer(Long id, CustomerFormDTO c) {
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

    public ResponseEntity<CustomerFormDTO> getByIdCustomer(Long id) {
        return repository.findById(id)
                .map(CustomerFormDTO::fromModel)
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

    public Page<CustomerFormDTO> listAllCustomers(
            String name,
            String cpf,
            Pageable pageable){
        return repository.findByNameOrCpf("%" + name + "%", "%" + cpf + "%",pageable)
                .map(CustomerFormDTO::fromModel);
    }
}
