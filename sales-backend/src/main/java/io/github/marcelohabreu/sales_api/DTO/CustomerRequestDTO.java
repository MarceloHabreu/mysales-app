package io.github.marcelohabreu.sales_api.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.github.marcelohabreu.sales_api.models.Customer;

import java.time.LocalDate;

public record CustomerRequestDTO(Long id,
                                 @JsonFormat(pattern = "dd/MM/yyyy")
                                 LocalDate birthDate,
                                 String cpf,
                                 String name,
                                 String address,
                                 String phone,
                                 String email,
                                 @JsonFormat(pattern = "dd/MM/yyyy")
                                 LocalDate registrationDate) {

    public Customer toModel() {
        return new Customer(id, birthDate, cpf, name,
                address, phone, email, registrationDate);
    }

    public static CustomerRequestDTO fromModel(Customer c) {
        return new CustomerRequestDTO(c.getId(), c.getBirthDate(),
                c.getCpf(), c.getName(), c.getAddress(),
                c.getPhone(), c.getEmail(), c.getRegistrationDate());
    }
}
