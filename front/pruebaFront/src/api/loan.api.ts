
import api from "./axios.api.ts";
import type { Loan, LoanRequest } from "../types/loan.ts";
import {fetchEventSource} from "@microsoft/fetch-event-source";


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

export const getMyLoans = async (): Promise<Loan[]> => {

    const response = await api.get<Loan[]>(
        "/api/v1/loans/my"
    );

    return response.data;

};

export function streamPendingLoans(
    onMessage: (loan: Loan) => void
) {
    const token = localStorage.getItem("token");
    return fetchEventSource(
        "http://localhost:8080/api/v1/loans/stream-pending",
        { headers: { Authorization: `Bearer ${token}`},
            onmessage(event) {
                const loan: Loan = JSON.parse(event.data);
                onMessage(loan);
            },
            onerror(error) {
                console.error(error);
                throw error;
            },
        }
    );
}