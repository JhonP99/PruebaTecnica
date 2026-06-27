import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Loan } from "../../types/loan.ts";

interface LoanState {
    pendingLoans: Loan[];
}

const initialState: LoanState = {
    pendingLoans: [],
};

const loanSlice = createSlice({
    name: "loan",
    initialState,
    reducers: {

        setPendingLoans(
            state,
            action: PayloadAction<Loan[]>
        ) {
            state.pendingLoans = action.payload;
        },

        addPendingLoan(
            state,
            action: PayloadAction<Loan>
        ) {
            state.pendingLoans.push(action.payload);
        },

        removePendingLoan(
            state,
            action: PayloadAction<number>
        ) {

            state.pendingLoans =
                state.pendingLoans.filter(
                    loan => loan.id !== action.payload
                );

        },

    },
});

export const {
    setPendingLoans,
    addPendingLoan,
    removePendingLoan
} = loanSlice.actions;

export default loanSlice.reducer;