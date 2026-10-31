package com.example.montra_backend.Service;




import com.example.montra_backend.dto.*;
import com.example.montra_backend.Entity.Expense;
import com.example.montra_backend.Entity.User;
import com.example.montra_backend.Repository.ExpenseRepository;
import com.example.montra_backend.Repository.ExpenseSpecification;
import com.example.montra_backend.exception.BadRequestException;
import com.example.montra_backend.exception.ResourceNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final AuthService authService;

    private static final DateTimeFormatter MONTH_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM");

    private static final DateTimeFormatter MONTH_LABEL_FORMATTER =
            DateTimeFormatter.ofPattern("MMM yyyy");

    public ExpenseServiceImpl(
            ExpenseRepository expenseRepository,
            AuthService authService) {
        this.expenseRepository = expenseRepository;
        this.authService = authService;
    }

    @Override
    public ExpenseResponseDTO createExpense(ExpenseRequestDTO dto) {

        User currentUser = authService.getCurrentUser();

        Expense expense = new Expense();
        expense.setAmount(dto.getAmount());
        expense.setCategory(dto.getCategory().trim());

        expense.setDescription(
                dto.getDescription() != null
                        ? dto.getDescription().trim()
                        : null
        );

        expense.setExpenseDate(dto.getExpenseDate());
        expense.setUser(currentUser);

        Expense saved = expenseRepository.save(expense);

        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public ExpenseResponseDTO getExpenseById(Long id) {

        User currentUser = authService.getCurrentUser();

        Expense expense = expenseRepository
                .findByIdAndUser_Id(id, currentUser.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Expense not found with id: " + id
                        )
                );

        return mapToResponse(expense);
    }

    @Override
    public ExpenseResponseDTO updateExpense(
            Long id,
            ExpenseRequestDTO dto) {

        User currentUser = authService.getCurrentUser();

        Expense expense = expenseRepository
                .findByIdAndUser_Id(id, currentUser.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Expense not found with id: " + id
                        )
                );

        expense.setAmount(dto.getAmount());
        expense.setCategory(dto.getCategory().trim());

        expense.setDescription(
                dto.getDescription() != null
                        ? dto.getDescription().trim()
                        : null
        );

        expense.setExpenseDate(dto.getExpenseDate());

        Expense updated = expenseRepository.save(expense);

        return mapToResponse(updated);
    }

    @Override
    public void deleteExpense(Long id) {

        User currentUser = authService.getCurrentUser();

        Expense expense = expenseRepository
                .findByIdAndUser_Id(id, currentUser.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Expense not found with id: " + id
                        )
                );

        expenseRepository.delete(expense);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<ExpenseResponseDTO> getAllExpenses(
            String category,
            LocalDate startDate,
            LocalDate endDate,
            String month,
            String search,
            String sortBy,
            String sortDirection,
            Integer page,
            Integer size) {

        User currentUser = authService.getCurrentUser();

        if (month != null
                && !month.trim().isEmpty()
                && (startDate == null || endDate == null)) {

            YearMonth ym = parseYearMonth(month.trim());

            if (startDate == null) {
                startDate = ym.atDay(1);
            }

            if (endDate == null) {
                endDate = ym.atEndOfMonth();
            }
        }

        if (startDate != null
                && endDate != null
                && startDate.isAfter(endDate)) {

            throw new BadRequestException(
                    "Start date (" + startDate
                            + ") cannot be after end date (" + endDate + ")"
            );
        }

        String cleanSortBy = "expenseDate";

        if (sortBy != null && !sortBy.trim().isEmpty()) {

            String field = sortBy.trim();

            if (List.of(
                    "expenseDate",
                    "amount",
                    "category",
                    "createdAt",
                    "description"
            ).contains(field)) {

                cleanSortBy = field;

            } else {
                throw new BadRequestException(
                        "Invalid sortBy field: " + field
                                + ". Allowed: expenseDate, amount, category, "
                                + "createdAt, description"
                );
            }
        }

        Sort.Direction direction =
                (sortDirection != null
                        && sortDirection.trim().equalsIgnoreCase("ASC"))
                        ? Sort.Direction.ASC
                        : Sort.Direction.DESC;

        Sort sort = Sort.by(direction, cleanSortBy)
                .and(Sort.by(direction, "id"));

        Specification<Expense> specification =
                ExpenseSpecification.filter(
                        currentUser.getId(),
                        category,
                        startDate,
                        endDate,
                        search
                );

        int pageNum = (page != null && page >= 0) ? page : 0;
        int pageSize = (size != null && size > 0) ? size : 20;

        Pageable pageable = PageRequest.of(
                pageNum,
                pageSize,
                sort
        );

        Page<Expense> expensePage =
                expenseRepository.findAll(specification, pageable);

        List<ExpenseResponseDTO> content =
                expensePage.getContent()
                        .stream()
                        .map(this::mapToResponse)
                        .collect(Collectors.toList());

        return new PageResponseDTO<>(
                content,
                expensePage.getNumber(),
                expensePage.getSize(),
                expensePage.getTotalElements(),
                expensePage.getTotalPages(),
                expensePage.isLast()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardSummaryDTO getDashboardSummary(String monthStr) {

        User currentUser = authService.getCurrentUser();
        Long userId = currentUser.getId();

        YearMonth targetMonth = parseYearMonth(monthStr);

        LocalDate startOfMonth = targetMonth.atDay(1);
        LocalDate endOfMonth = targetMonth.atEndOfMonth();
        LocalDate today = LocalDate.now();

        BigDecimal monthlyTotal =
                expenseRepository.calculateTotalBetween(
                        userId,
                        startOfMonth,
                        endOfMonth
                );

        monthlyTotal = monthlyTotal == null
                ? BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP)
                : monthlyTotal.setScale(2, RoundingMode.HALF_UP);

        BigDecimal todayTotal =
                expenseRepository.calculateTotalForDate(userId, today);

        todayTotal = todayTotal == null
                ? BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP)
                : todayTotal.setScale(2, RoundingMode.HALF_UP);

        long count = expenseRepository.countBetween(
                userId,
                startOfMonth,
                endOfMonth
        );

        YearMonth currentYearMonth = YearMonth.now();

        int elapsedDays;

        if (targetMonth.equals(currentYearMonth)) {
            elapsedDays = today.getDayOfMonth();
        } else if (targetMonth.isBefore(currentYearMonth)) {
            elapsedDays = targetMonth.lengthOfMonth();
        } else {
            elapsedDays = 0;
        }

        BigDecimal averageDailySpending;

        if (elapsedDays <= 0
                || monthlyTotal.compareTo(BigDecimal.ZERO) == 0) {

            averageDailySpending =
                    BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);

        } else {
            averageDailySpending = monthlyTotal.divide(
                    BigDecimal.valueOf(elapsedDays),
                    2,
                    RoundingMode.HALF_UP
            );
        }

        return new DashboardSummaryDTO(
                monthlyTotal,
                todayTotal,
                count,
                averageDailySpending,
                targetMonth.format(MONTH_FORMATTER),
                elapsedDays
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryBreakdownDTO> getCategoryBreakdown(
            String monthStr) {

        User currentUser = authService.getCurrentUser();
        Long userId = currentUser.getId();

        YearMonth targetMonth = parseYearMonth(monthStr);

        LocalDate startOfMonth = targetMonth.atDay(1);
        LocalDate endOfMonth = targetMonth.atEndOfMonth();

        BigDecimal monthlyTotal =
                expenseRepository.calculateTotalBetween(
                        userId,
                        startOfMonth,
                        endOfMonth
                );

        if (monthlyTotal == null
                || monthlyTotal.compareTo(BigDecimal.ZERO) == 0) {
            monthlyTotal = BigDecimal.ZERO;
        }

        List<Object[]> rawList =
                expenseRepository.getCategoryBreakdownBetween(
                        userId,
                        startOfMonth,
                        endOfMonth
                );

        List<CategoryBreakdownDTO> result = new ArrayList<>();

        for (Object[] row : rawList) {

            String category = (String) row[0];
            BigDecimal total = (BigDecimal) row[1];
            Long transactionCount = ((Number) row[2]).longValue();

            Double percentage = 0.0;

            if (monthlyTotal.compareTo(BigDecimal.ZERO) > 0) {
                percentage = total
                        .multiply(BigDecimal.valueOf(100))
                        .divide(
                                monthlyTotal,
                                2,
                                RoundingMode.HALF_UP
                        )
                        .doubleValue();
            }

            result.add(
                    new CategoryBreakdownDTO(
                            category,
                            total.setScale(2, RoundingMode.HALF_UP),
                            transactionCount,
                            percentage
                    )
            );
        }

        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<MonthlyTrendDTO> getMonthlyTrend(Integer monthsCount) {

        User currentUser = authService.getCurrentUser();
        Long userId = currentUser.getId();

        int count = (monthsCount != null
                && monthsCount > 0
                && monthsCount <= 24)
                ? monthsCount
                : 6;

        YearMonth endYm = YearMonth.now();
        YearMonth startYm = endYm.minusMonths(count - 1);

        LocalDate startDate = startYm.atDay(1);
        LocalDate endDate = endYm.atEndOfMonth();

        List<Object[]> dbData =
                expenseRepository.getMonthlyTotalsBetween(
                        userId,
                        startDate,
                        endDate
                );

        Map<String, Object[]> dataMap = new HashMap<>();

        for (Object[] row : dbData) {

            int year = ((Number) row[0]).intValue();
            int month = ((Number) row[1]).intValue();

            BigDecimal total = (BigDecimal) row[2];
            Long transactionCount = ((Number) row[3]).longValue();

            String key = String.format("%04d-%02d", year, month);

            dataMap.put(
                    key,
                    new Object[]{total, transactionCount}
            );
        }

        List<MonthlyTrendDTO> trend = new ArrayList<>();

        YearMonth current = startYm;

        while (!current.isAfter(endYm)) {

            String key = current.format(MONTH_FORMATTER);
            String label = current.format(MONTH_LABEL_FORMATTER);

            BigDecimal total =
                    BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);

            Long transactionCount = 0L;

            if (dataMap.containsKey(key)) {

                Object[] value = dataMap.get(key);

                total = ((BigDecimal) value[0])
                        .setScale(2, RoundingMode.HALF_UP);

                transactionCount = (Long) value[1];
            }

            trend.add(
                    new MonthlyTrendDTO(
                            key,
                            label,
                            total,
                            transactionCount
                    )
            );

            current = current.plusMonths(1);
        }

        return trend;
    }

    private YearMonth parseYearMonth(String monthStr) {

        if (monthStr == null || monthStr.trim().isEmpty()) {
            return YearMonth.now();
        }

        try {
            return YearMonth.parse(
                    monthStr.trim(),
                    MONTH_FORMATTER
            );

        } catch (DateTimeParseException ex) {
            throw new BadRequestException(
                    "Invalid month format: '" + monthStr
                            + "'. Expected format: YYYY-MM (e.g., 2026-10)"
            );
        }
    }

    private ExpenseResponseDTO mapToResponse(Expense entity) {

        return new ExpenseResponseDTO(
                entity.getId(),
                entity.getAmount().setScale(2, RoundingMode.HALF_UP),
                entity.getCategory(),
                entity.getDescription(),
                entity.getExpenseDate(),
                entity.getCreatedAt()
        );
    }
}

