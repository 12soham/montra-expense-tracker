
package com.example.montra_backend.dto;

import java.math.BigDecimal;

public class MonthlyTrendDTO {

    private String month;
    private String label;
    private BigDecimal total;
    private Long transactionCount;

    public MonthlyTrendDTO() {
    }

    public MonthlyTrendDTO(
            String month,
            String label,
            BigDecimal total,
            Long transactionCount
    ) {
        this.month = month;
        this.label = label;
        this.total = total;
        this.transactionCount = transactionCount;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Long getTransactionCount() {
        return transactionCount;
    }

    public void setTransactionCount(Long transactionCount) {
        this.transactionCount = transactionCount;
    }
}
