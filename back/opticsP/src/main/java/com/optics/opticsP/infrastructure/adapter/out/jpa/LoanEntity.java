package com.optics.opticsP.infrastructure.adapter.out.jpa;

import com.optics.opticsP.domain.model.LoanStatus;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "loans")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class LoanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private BigDecimal amount;
    private Integer termMonths;
    @Enumerated(EnumType.STRING)
    private LoanStatus status;
    private LocalDateTime createdAt;
}