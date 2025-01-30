package io.github.marcelohabreu.sales_api.services;

import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class ReportSalesService {

    private static final Logger logger = Logger.getLogger(ReportSalesService.class.getName());

    @Value("classpath:reports/sales-report.jrxml")
    private Resource reportSalesSource;

    @Value("classpath:reports/sales-report.jasper")
    private Resource reportSalesCompiled;

    @Autowired
    private DataSource dataSource;

    public byte[] generateReport(Long idCustomer, Date startDate, Date endDate) throws RuntimeException {
        // Log das datas
        logger.info("Generating report with START_DATE: " + startDate + " and END_DATE: " + endDate + ",User: " + idCustomer);
        // try with resource
        try (
                Connection connection = dataSource.getConnection();
        ) {
            /*
             compiling
             JasperReport compileReport = JasperCompileManager
                    .compileReport(reportSalesSource.getInputStream());
            */

            Map<String, Object> parameters = new HashMap<>();
            parameters.put("ID_CUSTOMER", idCustomer);
            parameters.put("START_DATE", startDate);
            parameters.put("END_DATE", endDate);

            return JasperRunManager.runReportToPdf(
                    reportSalesCompiled.getInputStream(),
                    parameters,
                    connection);

            // filling
            //JasperPrint print = JasperFillManager
            //        .fillReport(compileReport, parameters, connection);

            // exporting
            // return JasperExportManager.exportReportToPdf(print);

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (JRException | IOException e) {
            throw new RuntimeException(e);
        }
        return null;
    }
}
