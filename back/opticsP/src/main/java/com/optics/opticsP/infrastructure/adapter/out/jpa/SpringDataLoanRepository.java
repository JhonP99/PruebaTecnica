package com.optics.opticsP.infrastructure.adapter.out.jpa;

import com.optics.opticsP.domain.model.LoanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SpringDataLoanRepository extends JpaRepository<LoanEntity, Long> {
    List<LoanEntity> findByStatus(LoanStatus status);
}