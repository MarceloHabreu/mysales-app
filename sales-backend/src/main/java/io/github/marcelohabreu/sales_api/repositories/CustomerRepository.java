package io.github.marcelohabreu.sales_api.repositories;

import io.github.marcelohabreu.sales_api.models.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmail(String email);

    @Query("SELECT c FROM Customer c WHERE upper(c.name) LIKE upper(:name) AND c.cpf LIKE :cpf AND c.userEmail = :userEmail")
    Page<Customer> findByNameOrCpf(
            @Param("name") String name,
            @Param("cpf") String cpf,
            @Param("userEmail") String userEmail,
            Pageable pageable
    );

    @Query(value = "select count(*) from customer where user_email = :userEmail", nativeQuery = true)
    Long countByUserEmail(@Param("userEmail") String userEmail);
}
