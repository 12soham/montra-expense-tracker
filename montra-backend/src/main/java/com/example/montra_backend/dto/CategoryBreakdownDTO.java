
package com.example.montra_backend.dto;

import java.math.BigDecimal;

public class CategoryBreakdownDTO {

    private String category;
    private BigDecimal total;
    private Long transactionCount;
    private Double percentage;

    public CategoryBreakdownDTO() {
    }

    public CategoryBreakdownDTO(
            String category,
            BigDecimal total,
            Long transactionCount
    ) {
        this.category = category;
        this.total = total;
        this.transactionCount = transactionCount;
    }

    public CategoryBreakdownDTO(
            String category,
            BigDecimal total,
            Long transactionCount,
            Double percentage
    ) {
        this.category = category;
        this.total = total;
        this.transactionCount = transactionCount;
        this.percentage = percentage;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }
}
