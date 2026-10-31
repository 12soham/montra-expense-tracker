
    package com.example.montra_backend.dto;

    import java.math.BigDecimal;
    import java.time.LocalDate;
    import java.time.LocalDateTime;

    public class ExpenseResponseDTO {

        private Long id;
        private BigDecimal amount;
        private String category;
        private String description;
        private LocalDate expenseDate;
        private LocalDateTime createdAt;

        public ExpenseResponseDTO() {
        }

        public ExpenseResponseDTO(
                Long id,
                BigDecimal amount,
                String category,
                String description,
                LocalDate expenseDate,
                LocalDateTime createdAt
        ) {
            this.id = id;
            this.amount = amount;
            this.category = category;
            this.description = description;
            this.expenseDate = expenseDate;
            this.createdAt = createdAt;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public BigDecimal getAmount() {
            return amount;
        }

        public void setAmount(BigDecimal amount) {
            this.amount = amount;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public LocalDate getExpenseDate() {
            return expenseDate;
        }

        public void setExpenseDate(LocalDate expenseDate) {
            this.expenseDate = expenseDate;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
        }
    }
