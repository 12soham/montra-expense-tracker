
package com.example.montra_backend.dto;

import java.math.BigDecimal;

public class DashboardSummaryDTO {

    private BigDecimal monthlyTotal;
    private BigDecimal todayTotal;
    private long transactionCount;
    private BigDecimal averageDailySpending;
    private String month;
    private int elapsedDays;

    public DashboardSummaryDTO() {
    }

    public DashboardSummaryDTO(
            BigDecimal monthlyTotal,
            BigDecimal todayTotal,
            long transactionCount,
            BigDecimal averageDailySpending,
            String month,
            int elapsedDays
    ) {
        this.monthlyTotal = monthlyTotal;
        this.todayTotal = todayTotal;
        this.transactionCount = transactionCount;
        this.averageDailySpending = averageDailySpending;
        this.month = month;
        this.elapsedDays = elapsedDays;
    }

    public BigDecimal getMonthlyTotal() {
        return monthlyTotal;
    }

    public void setMonthlyTotal(BigDecimal monthlyTotal) {
        this.monthlyTotal = monthlyTotal;
    }

    public BigDecimal getTodayTotal() {
        return todayTotal;
    }

    public void setTodayTotal(BigDecimal todayTotal) {
        this.todayTotal = todayTotal;
    }

    public long getTransactionCount() {
        return transactionCount;
    }

    public void setTransactionCount(long transactionCount) {
        this.transactionCount = transactionCount;
    }

    public BigDecimal getAverageDailySpending() {
        return averageDailySpending;
    }

    public void setAverageDailySpending(BigDecimal averageDailySpending) {
        this.averageDailySpending = averageDailySpending;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public int getElapsedDays() {
        return elapsedDays;
    }

    public void setElapsedDays(int elapsedDays) {
        this.elapsedDays = elapsedDays;
    }
}
