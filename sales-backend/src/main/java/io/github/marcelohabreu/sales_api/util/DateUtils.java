package io.github.marcelohabreu.sales_api.util;

import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateUtils {
    public static final Date DEFAULT_START_DATE;
    public static final String DEFAULT_FORMATTING_DATE = "dd/MM/yyyy";

    static {
        DEFAULT_START_DATE = DateUtils.fromString("01/01/2025");
    }
    public static Date fromString(String dateString){
        return fromString(dateString, false);
    }

    public static Date fromString(String dateString, boolean atEndOfDay){
        if (!StringUtils.hasText(dateString)){
            return null;
        }
        var date = LocalDate.parse(dateString, DateTimeFormatter.ofPattern(DEFAULT_FORMATTING_DATE));
        LocalDateTime dateTime;
        if (atEndOfDay) {
            dateTime = date.atTime(LocalTime.of(23,59));
        } else {
            dateTime = date.atStartOfDay();
        }
        var instant = dateTime.atZone(ZoneId.systemDefault()).toInstant();
        return Date.from(instant);
    }

    public static Date today(boolean atEndOfDay){
        String dateTodayFormatted = LocalDate.now().format(DateTimeFormatter.ofPattern(DEFAULT_FORMATTING_DATE));
        return fromString(dateTodayFormatted, atEndOfDay);
    }
}
