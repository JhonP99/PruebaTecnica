package com.optics.opticsP.application.service.port.out;

import com.optics.opticsP.domain.model.Loan;
import java.util.Optional;
import java.util.List;

public interface LoanPort {
    Loan save(Loan loan);
    Optional<Loan> findById(Long id);
    List<Loan> findAllPending();
    List<Loan> findByUsername(String username);
}
