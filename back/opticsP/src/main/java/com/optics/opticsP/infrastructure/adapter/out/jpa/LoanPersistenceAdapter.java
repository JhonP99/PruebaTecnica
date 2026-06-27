package com.optics.opticsP.infrastructure.adapter.out.jpa;

import com.optics.opticsP.application.service.port.out.LoanPort;
import com.optics.opticsP.domain.model.Loan;
import com.optics.opticsP.domain.model.LoanStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class LoanPersistenceAdapter implements LoanPort {

    private final SpringDataLoanRepository repository;

    @Override
    public Loan save(Loan loan) {
        LoanEntity entity = new LoanEntity(
                loan.id(), loan.username(), loan.amount(), loan.termMonths(), loan.status(), loan.createdAt()
        );
        LoanEntity saved = repository.save(entity);
        return new Loan(saved.getId(), saved.getUsername(), saved.getAmount(), saved.getTermMonths(), saved.getStatus(), saved.getCreatedAt());
    }

    @Override
    public Optional<Loan> findById(Long id) {
        return repository.findById(id)
                .map(e -> new Loan(e.getId(), e.getUsername(), e.getAmount(), e.getTermMonths(), e.getStatus(), e.getCreatedAt()));
    }

    @Override
    public List<Loan> findAllPending() {
        return repository.findByStatus(LoanStatus.PENDING).stream()
                .map(e -> new Loan(e.getId(), e.getUsername(), e.getAmount(), e.getTermMonths(), e.getStatus(), e.getCreatedAt()))
                .collect(Collectors.toList());
    }

    @Override
    public List<Loan> findByUsername(String username) {

        return repository.findByUsername(username)
                .stream()
                .map(e -> new Loan(
                        e.getId(),
                        e.getUsername(),
                        e.getAmount(),
                        e.getTermMonths(),
                        e.getStatus(),
                        e.getCreatedAt()
                ))
                .toList();

    }


}