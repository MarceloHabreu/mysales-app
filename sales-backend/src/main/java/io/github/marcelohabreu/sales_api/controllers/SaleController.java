package io.github.marcelohabreu.sales_api.controllers;

import io.github.marcelohabreu.sales_api.models.Sale;
import io.github.marcelohabreu.sales_api.repositories.ItemSaleRepository;
import io.github.marcelohabreu.sales_api.repositories.SaleRepository;
import io.github.marcelohabreu.sales_api.services.ReportSalesService;
import io.github.marcelohabreu.sales_api.util.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin("*")
public class SaleController {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private ItemSaleRepository itemSaleRepository;

    @Autowired
    private ReportSalesService reportSalesService;

    private String encodeUserId(String userId){
        return URLEncoder.encode(userId, StandardCharsets.UTF_8);
    }

    @PostMapping
    @Transactional
    public void makingSale(@RequestBody Sale sale, @RequestParam(value = "userId") String userId) {
        sale.setUserId(userId);
        saleRepository.save(sale);
        sale.getItems().forEach(is -> is.setSale(sale));
        itemSaleRepository.saveAll(sale.getItems());
    }

    @GetMapping("/report-sales")
    public ResponseEntity<byte[]> reportSales(
            @RequestParam(value = "id", required = false, defaultValue = "") Long id,
            @RequestParam(value = "start", required = false, defaultValue = "") String start,
            @RequestParam(value = "end", required = false, defaultValue = "") String end,
            @RequestParam(value = "userId") String userId
    ) {
        Date startDate = DateUtils.fromString(start);
        Date endDate = DateUtils.fromString(end, true);

        if (startDate == null) {
            startDate = DateUtils.DEFAULT_START_DATE;
        }

        if (endDate == null){
            endDate = DateUtils.today(true);
        }

        byte[] reportGenerated = reportSalesService.generateReport(id,startDate,endDate, userId);

        HttpHeaders headers = new HttpHeaders();
        var fileName = "report-sales.pdf";

        // setting data
        headers.setContentDispositionFormData("inline; fileName=\"" + fileName + "\"", fileName);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

        return new ResponseEntity<>(reportGenerated, headers, HttpStatus.OK);
    }

}
