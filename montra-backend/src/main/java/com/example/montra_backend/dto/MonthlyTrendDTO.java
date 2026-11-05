
package com.example.montra_backend.dto;

import java.math.BigDecimal;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MonthlyTrendDTO {
    private String month;
    private String label;
    private BigDecimal total;
    private Long transactionCount;
}
