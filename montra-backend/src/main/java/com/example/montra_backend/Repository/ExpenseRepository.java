
package com.example.montra_backend.Repository;

import com.example.montra_backend.Entity.Expense;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

public interface ExpenseRepository
        extends JpaRepository<Expense, Long>,
                JpaSpecificationExecutor<Expense> {

    // Calculate total expenses within a date range
    @Query("""
        SELECT COALESCE(SUM(e.amount), 0)
        FROM Expense e
        WHERE e.user.id = :userId
        AND e.expenseDate BETWEEN :startDate AND :endDate
        """)
    BigDecimal calculateTotalBetween(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    // Calculate total expenses for a particular date
    @Query("""
        SELECT COALESCE(SUM(e.amount), 0)
        FROM Expense e
        WHERE e.user.id = :userId
        AND e.expenseDate = :date
        """)
    BigDecimal calculateTotalForDate(
            @Param("userId") Long userId,
            @Param("date") LocalDate date
    );

    // Count expenses within a date range
    @Query("""
        SELECT COUNT(e)
        FROM Expense e
        WHERE e.user.id = :userId
        AND e.expenseDate BETWEEN :startDate AND :endDate
        """)
    long countBetween(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    // Group expenses by category
    @Query("""
        SELECT e.category, COALESCE(SUM(e.amount), 0), COUNT(e)
        FROM Expense e
        WHERE e.user.id = :userId
        AND e.expenseDate BETWEEN :startDate AND :endDate
        GROUP BY e.category
        ORDER BY SUM(e.amount) DESC
        """)
    List<Object[]> getCategoryBreakdownBetween(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    // Get monthly expense totals
    @Query("""
        SELECT YEAR(e.expenseDate), MONTH(e.expenseDate),
               COALESCE(SUM(e.amount), 0), COUNT(e)
        FROM Expense e
        WHERE e.user.id = :userId
        AND e.expenseDate BETWEEN :startDate AND :endDate
        GROUP BY YEAR(e.expenseDate), MONTH(e.expenseDate)
        ORDER BY YEAR(e.expenseDate) ASC, MONTH(e.expenseDate) ASC
        """)
    List<Object[]> getMonthlyTotalsBetween(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    // Find an expense belonging to a specific user
    Optional<Expense> findByIdAndUser_Id(Long id, Long userId);

    // Check whether an expense belongs to a specific user
    boolean existsByIdAndUser_Id(Long id, Long userId);
}
