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

    @Query("SELECT c FROM Customer c WHERE upper(c.name) LIKE upper(:name) AND c.cpf LIKE :cpf AND c.userId = :userId")
    Page<Customer> findByNameOrCpf(
            @Param("name") String name,
            @Param("cpf") String cpf,
            @Param("userId") String userId,
            Pageable pageable
    );

    @Query(value = "select count(*) from customer where user_id = :userId", nativeQuery = true)
    Long countByUserId(@Param("userId") String userId);
}
