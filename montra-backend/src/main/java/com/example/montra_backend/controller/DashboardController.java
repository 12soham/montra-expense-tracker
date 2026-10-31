
package com.example.montra_backend.controller;

import com.example.montra_backend.dto.CategoryBreakdownDTO;
import com.example.montra_backend.dto.DashboardSummaryDTO;
import com.example.montra_backend.dto.MonthlyTrendDTO;
import com.example.montra_backend.Service.ExpenseService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final ExpenseService expenseService;

    public DashboardController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDTO> getSummary(
            @RequestParam(required = false) String month) {

        DashboardSummaryDTO summary =
                expenseService.getDashboardSummary(month);

        return ResponseEntity.ok(summary);
    }

    @GetMapping("/category-breakdown")
    public ResponseEntity<List<CategoryBreakdownDTO>> getCategoryBreakdown(
            @RequestParam(required = false) String month) {

        List<CategoryBreakdownDTO> breakdown =
                expenseService.getCategoryBreakdown(month);

        return ResponseEntity.ok(breakdown);
    }

    @GetMapping("/monthly-trend")
    public ResponseEntity<List<MonthlyTrendDTO>> getMonthlyTrend(
            @RequestParam(defaultValue = "6") Integer months) {

        List<MonthlyTrendDTO> trend =
                expenseService.getMonthlyTrend(months);

        return ResponseEntity.ok(trend);
    }
}
