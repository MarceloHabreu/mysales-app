package io.github.marcelohabreu.sales_api.repositories;

import io.github.marcelohabreu.sales_api.models.Sale;
import io.github.marcelohabreu.sales_api.repositories.projections.SaleByMonth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    @Query(nativeQuery = true, value =
            "select extract (month from s.date_sale) as month, sum(s.total) as value " +
                    "from sale as s " +
                    "where extract (year from s.date_sale) = :year " +
                    "group by extract (month from s.date_sale) " +
                    "order by extract (month from s.date_sale) "

    )
    List<SaleByMonth> getSumSalesByMonth(@Param(("year")) Integer year);
}
