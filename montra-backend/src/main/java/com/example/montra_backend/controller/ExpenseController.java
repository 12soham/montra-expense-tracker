
package com.example.montra_backend.controller;

import com.example.montra_backend.dto.ExpenseRequestDTO;
import com.example.montra_backend.dto.ExpenseResponseDTO;
import com.example.montra_backend.dto.PageResponseDTO;
import com.example.montra_backend.Service.ExpenseService;

import jakarta.validation.Valid;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // Create a new expense
    @PostMapping
    public ResponseEntity<ExpenseResponseDTO> createExpense(
            @Valid @RequestBody ExpenseRequestDTO requestDTO
    ) {
        ExpenseResponseDTO created =
                expenseService.createExpense(requestDTO);

        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Get expenses with filtering, sorting, and pagination
    @GetMapping
    public ResponseEntity<PageResponseDTO<ExpenseResponseDTO>> getAllExpenses(
            @RequestParam(required = false) String category,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate,

            @RequestParam(required = false) String month,
            @RequestParam(required = false) String search,

            @RequestParam(required = false, defaultValue = "expenseDate")
            String sortBy,

            @RequestParam(required = false, defaultValue = "DESC")
            String sortDirection,

            @RequestParam(required = false, defaultValue = "0")
            Integer page,

            @RequestParam(required = false, defaultValue = "20")
            Integer size
    ) {
        PageResponseDTO<ExpenseResponseDTO> response =
                expenseService.getAllExpenses(
                        category,
                        startDate,
                        endDate,
                        month,
                        search,
                        sortBy,
                        sortDirection,
                        page,
                        size
                );

        return ResponseEntity.ok(response);
    }

    // Get a single expense by ID
    @GetMapping("/{id}")
    public ResponseEntity<ExpenseResponseDTO> getExpenseById(
            @PathVariable Long id
    ) {
        ExpenseResponseDTO expense =
                expenseService.getExpenseById(id);

        return ResponseEntity.ok(expense);
    }

    // Update an existing expense
    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponseDTO> updateExpense(
            @PathVariable Long id,
            @Valid @RequestBody ExpenseRequestDTO requestDTO
    ) {
        ExpenseResponseDTO updated =
                expenseService.updateExpense(id, requestDTO);

        return ResponseEntity.ok(updated);
    }

    // Delete an expense
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(
            @PathVariable Long id
    ) {
        expenseService.deleteExpense(id);

        return ResponseEntity.noContent().build();
    }
}
