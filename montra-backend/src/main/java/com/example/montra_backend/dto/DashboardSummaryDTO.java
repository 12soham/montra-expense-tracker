
package com.example.montra_backend.dto;

import java.math.BigDecimal;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DashboardSummaryDTO {
    private BigDecimal monthlyTotal;
    private BigDecimal todayTotal;
    private long transactionCount;
    private BigDecimal averageDailySpending;
    private String month;
    private int elapsedDays;
}
