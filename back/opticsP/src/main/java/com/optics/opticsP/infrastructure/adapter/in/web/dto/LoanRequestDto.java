package com.optics.opticsP.infrastructure.adapter.in.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record LoanRequestDto(
        @NotNull(message = "El monto no puede ser nulo")
        @Min(value = 100, message = "El monto mínimo a solicitar es 100")
        BigDecimal amount,

        @NotNull(message = "El plazo en meses es obligatorio")
        @Min(value = 1, message = "El plazo mínimo es de 1 mes")
        Integer termMonths
) {}