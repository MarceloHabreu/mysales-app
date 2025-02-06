package io.github.marcelohabreu.sales_api.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.github.marcelohabreu.sales_api.models.Customer;

import java.time.LocalDate;

public record CustomerFormDTO(Long id,
                              @JsonFormat(pattern = "dd/MM/yyyy")
                                 LocalDate birthDate,
                              String cpf,
                              String name,
                              String address,
                              String phone,
                              String email,
                              @JsonFormat(pattern = "dd/MM/yyyy")
                                 LocalDate registrationDate,
                              String userId
                              ) {

    public Customer toModel() {
        return new Customer(id, birthDate, cpf, name,
                address, phone, email, registrationDate, userId);
    }

    public static CustomerFormDTO fromModel(Customer c) {
        return new CustomerFormDTO(c.getId(), c.getBirthDate(),
                c.getCpf(), c.getName(), c.getAddress(),
                c.getPhone(), c.getEmail(), c.getRegistrationDate(), c.getUserId());
    }
}
