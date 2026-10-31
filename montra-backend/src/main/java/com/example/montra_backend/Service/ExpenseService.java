


package com.example.montra_backend.Service;

import com.example.montra_backend.dto.*;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseService {

    ExpenseResponseDTO createExpense(ExpenseRequestDTO dto);

    ExpenseResponseDTO getExpenseById(Long id);

    ExpenseResponseDTO updateExpense(Long id, ExpenseRequestDTO dto);

    void deleteExpense(Long id);

    PageResponseDTO<ExpenseResponseDTO> getAllExpenses(
            String category,
            LocalDate startDate,
            LocalDate endDate,
            String month,
            String search,
            String sortBy,
            String sortDirection,
            Integer page,
            Integer size
    );

    DashboardSummaryDTO getDashboardSummary(String monthStr);

    List<CategoryBreakdownDTO> getCategoryBreakdown(String monthStr);

    List<MonthlyTrendDTO> getMonthlyTrend(Integer monthsCount);
}
