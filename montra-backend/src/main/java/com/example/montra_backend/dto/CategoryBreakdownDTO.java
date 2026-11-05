
package com.example.montra_backend.dto;

import java.math.BigDecimal;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CategoryBreakdownDTO {
    private String category;
    private BigDecimal total;
    private Long transactionCount;
    private Double percentage;
}
