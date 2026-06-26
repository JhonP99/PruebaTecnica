export type LoanStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED";

export interface Loan {

    id: number;

    username: string;

    amount: number;

    termMonths: number;

    status: LoanStatus;

    createdAt: string;
}

export interface LoanRequest {

    amount: number;

    termMonths: number;

}