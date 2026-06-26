package com.optics.opticsP.domain.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record Loan(
        Long id,
        String username,
        BigDecimal amount,
        Integer termMonths,
        LoanStatus status,
        LocalDateTime createdAt
) {}
