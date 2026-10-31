
package com.example.montra_backend.Repository;

import com.example.montra_backend.Entity.Expense;
import jakarta.persistence.criteria.Predicate;

import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ExpenseSpecification {

    public static Specification<Expense> filter(
            Long userId,
            String category,
            LocalDate startDate,
            LocalDate endDate,
            String search
    ) {
        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            // Filter expenses belonging to the current user
            predicates.add(
                    cb.equal(root.get("user").get("id"), userId)
            );

            // Filter by category
            if (category != null
                    && !category.trim().isEmpty()
                    && !category.equalsIgnoreCase("ALL")) {

                predicates.add(
                        cb.equal(
                                cb.lower(root.get("category")),
                                category.trim().toLowerCase()
                        )
                );
            }

            // Filter by starting date
            if (startDate != null) {
                predicates.add(
                        cb.greaterThanOrEqualTo(
                                root.get("expenseDate"), startDate
                        )
                );
            }

            // Filter by ending date
            if (endDate != null) {
                predicates.add(
                        cb.lessThanOrEqualTo(
                                root.get("expenseDate"), endDate
                        )
                );
            }

            // Search description or category
            if (search != null && !search.trim().isEmpty()) {

                String searchPattern =
                        "%" + search.trim().toLowerCase() + "%";

                Predicate descriptionPredicate = cb.like(
                        cb.lower(root.get("description")),
                        searchPattern
                );

                Predicate categoryPredicate = cb.like(
                        cb.lower(root.get("category")),
                        searchPattern
                );

                predicates.add(
                        cb.or(descriptionPredicate, categoryPredicate)
                );
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
