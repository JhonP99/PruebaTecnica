package com.optics.opticsP.application.service;

import com.optics.opticsP.application.service.port.out.LoanPort;
import com.optics.opticsP.domain.model.Loan;
import com.optics.opticsP.domain.model.LoanStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoanUseCaseService {

    private final LoanPort loanPort;

    @Transactional
    public Loan requestLoan(String username, Loan loanRequest) {
        Loan newLoan = new Loan(
                null,
                username,
                loanRequest.amount(),
                loanRequest.termMonths(),
                LoanStatus.PENDING,
                LocalDateTime.now()
        );
        return loanPort.save(newLoan);
    }

    @Cacheable(value = "loanStatusCache", key = "#id")
    @Transactional(readOnly = true)
    public Optional<Loan> getLoanStatus(Long id) {
        return loanPort.findById(id);
    }

    @Transactional
    @CacheEvict(value = "loanStatusCache", key = "#id")
    public Loan reviewLoan(Long id, LoanStatus newStatus) {
        Loan existingLoan = loanPort.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El préstamo con ID " + id + " no existe."));

        if (existingLoan.status() != LoanStatus.PENDING) {
            throw new IllegalStateException("Este préstamo ya fue revisado y no puede modificarse.");
        }

        Loan updatedLoan = new Loan(
                existingLoan.id(),
                existingLoan.username(),
                existingLoan.amount(),
                existingLoan.termMonths(),
                newStatus,
                existingLoan.createdAt()
        );

        return loanPort.save(updatedLoan);
    }
}