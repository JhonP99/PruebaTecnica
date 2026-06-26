
import api from "./axios.api.tsx";
import type { Loan, LoanRequest } from "../types/loan";


export const requestLoan = async (
    request: LoanRequest
): Promise<Loan> => {

    const response = await api.post<Loan>(
        "/api/v1/loans/request",
        request
    );

    return response.data;

};

export const getLoanStatus = async (
    id: number
): Promise<Loan> => {

    const response = await api.get<Loan>(
        `/api/v1/loans/${id}/status`
    );

    return response.data;

};

export const approveLoan = async (
    id: number
): Promise<Loan> => {

    const response = await api.put<Loan>(
        `/api/v1/loans/${id}/approve`
    );

    return response.data;

};

export const rejectLoan = async (
    id: number
): Promise<Loan> => {

    const response = await api.put<Loan>(
        `/api/v1/loans/${id}/reject`
    );

    return response.data;

};