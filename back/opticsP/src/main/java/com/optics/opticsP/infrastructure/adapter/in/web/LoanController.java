package com.optics.opticsP.infrastructure.adapter.in.web;

import com.optics.opticsP.application.service.LoanUseCaseService;
import com.optics.opticsP.application.service.port.out.LoanPort;
import com.optics.opticsP.domain.model.Loan;
import com.optics.opticsP.domain.model.LoanStatus;
import com.optics.opticsP.infrastructure.adapter.in.web.dto.LoanRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;

@RestController
@RequestMapping("/api/v1/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanUseCaseService loanUseCaseService;
    private final LoanPort loanPort;

    @PostMapping("/request")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Loan> requestLoan(@Valid @RequestBody LoanRequestDto dto, Authentication authentication) {
        Loan requested = loanUseCaseService.requestLoan(authentication.getName(), new Loan(null, null, dto.amount(), dto.termMonths(), null, null));
        return ResponseEntity.ok(requested);
    }


    @GetMapping("/{id}/status")
    public ResponseEntity<Loan> getLoanStatus(@PathVariable Long id) {
        return loanUseCaseService.getLoanStatus(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Loan> approveLoan(@PathVariable Long id) {
        return ResponseEntity.ok(loanUseCaseService.reviewLoan(id, LoanStatus.APPROVED));
    }


    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Loan> rejectLoan(@PathVariable Long id) {
        return ResponseEntity.ok(loanUseCaseService.reviewLoan(id, LoanStatus.REJECTED));
    }


    @GetMapping(value = "/stream-pending", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Loan> streamPendingLoans() {
        return Flux.interval(Duration.ofSeconds(3))
                .flatMapIterable(sequence -> loanPort.findAllPending());
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Loan>> getMyLoans(Authentication authentication) {
        return ResponseEntity.ok(
                loanUseCaseService.getLoansByUsername(authentication.getName())
        );

    }
}