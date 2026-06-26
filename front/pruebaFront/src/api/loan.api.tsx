
import type {Loan, LoanRequest} from "../types/loan.tsx";
import axiosApi from "./axios.api.tsx";


export const requestLoan = async (
    request: LoanRequest
): Promise<Loan> => {

    const response = await axiosApi.post<Loan>(
        "/api/v1/loans/request",
        request
    );

    return response.data;

};

export const getLoanStatus = async (
    id: number
): Promise<Loan> => {

    const response = await axiosApi.get<Loan>(
        `/api/v1/loans/${id}/status`
    );

    return response.data;

};

export const approveLoan = async (
    id: number
): Promise<Loan> => {

    const response = await axiosApi.put<Loan>(
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