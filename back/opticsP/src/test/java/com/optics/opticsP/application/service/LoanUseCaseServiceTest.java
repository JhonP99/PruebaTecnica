package com.optics.opticsP.application.service;

import com.optics.opticsP.application.service.port.out.LoanPort;
import com.optics.opticsP.domain.model.Loan;
import com.optics.opticsP.domain.model.LoanStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LoanUseCaseServiceTest {

    @Mock
    private LoanPort loanPort;

    @InjectMocks
    private LoanUseCaseService loanUseCaseService;

    private Loan pendingLoan;

    @BeforeEach
    void setUp() {
        pendingLoan = new Loan(1L, "jhon", new BigDecimal("5000"), 12, LoanStatus.PENDING, LocalDateTime.now());
    }

    @Test
    void shouldApproveLoanSuccessfully() {

        when(loanPort.findById(1L)).thenReturn(Optional.of(pendingLoan));
        when(loanPort.save(any(Loan.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Loan approvedLoan = loanUseCaseService.reviewLoan(1L, LoanStatus.APPROVED);


        assertNotNull(approvedLoan);
        assertEquals(LoanStatus.APPROVED, approvedLoan.status());
        verify(loanPort, times(1)).findById(1L);
        verify(loanPort, times(1)).save(any(Loan.class));
    }

    @Test
    void shouldThrowExceptionWhenLoanDoesNotExist() {

        when(loanPort.findById(99L)).thenReturn(Optional.empty());


        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            loanUseCaseService.reviewLoan(99L, LoanStatus.APPROVED);
        });

        assertEquals("El préstamo con ID 99 no existe.", exception.getMessage());
        verify(loanPort, times(1)).findById(99L);
        verify(loanPort, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenLoanIsAlreadyReviewed() {

        Loan alreadyApprovedLoan = new Loan(1L, "jhon_paz", new BigDecimal("5000"), 12, LoanStatus.APPROVED, LocalDateTime.now());
        when(loanPort.findById(1L)).thenReturn(Optional.of(alreadyApprovedLoan));

        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> {
            loanUseCaseService.reviewLoan(1L, LoanStatus.REJECTED);
        });

        assertEquals("Este préstamo ya fue revisado y no puede modificarse.", exception.getMessage());
        verify(loanPort, times(1)).findById(1L);
        verify(loanPort, never()).save(any());
    }
}