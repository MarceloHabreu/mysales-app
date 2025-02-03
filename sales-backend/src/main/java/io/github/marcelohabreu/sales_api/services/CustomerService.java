package io.github.marcelohabreu.sales_api.services;

import io.github.marcelohabreu.sales_api.DTO.CustomerFormDTO;
import io.github.marcelohabreu.sales_api.models.Customer;
import io.github.marcelohabreu.sales_api.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public ResponseEntity<Void> updateCustomer(Long id, CustomerFormDTO c, String userEmail) {
        Optional<Customer> customerOptional = repository.findById(id);

        if (customerOptional.isEmpty() || !customerOptional.get().getUserEmail().equals(userEmail)) {
            return ResponseEntity.notFound().build();
        }

        Customer existingCustomer = c.toModel();
        existingCustomer.setId(id);
        existingCustomer.setUserEmail(userEmail);
        existingCustomer.setRegistrationDate(customerOptional.get().getRegistrationDate());
        repository.save(existingCustomer);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<CustomerFormDTO> getByIdCustomer(Long id, String userEmail) {
        return repository.findById(id)
                .filter(customer -> customer.getUserEmail().equals(userEmail))
                .map(CustomerFormDTO::fromModel)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public ResponseEntity<Object> deleteCustomer(Long id, String userEmail){
        return repository.findById(id)
                .filter(customer -> customer.getUserEmail().equals(userEmail))
                .map(customer -> {
                    repository.delete(customer);
                    return ResponseEntity.noContent().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public Page<CustomerFormDTO> listAllCustomers(String name, String cpf,String userEmail, Pageable pageable) {
        // Criando o PageRequest com a ordenação desejada (por id ascendente)
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.ASC, "id"));

        return repository.findByNameOrCpf("%" + name + "%", "%" + cpf + "%", userEmail, sortedPageable)
                .map(CustomerFormDTO::fromModel);
    }
}
