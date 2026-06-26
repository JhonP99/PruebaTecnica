import api from "./axios.api.tsx";
import type {
    LoginRequest,
    RegisterRequest,
    AuthResponse,
} from "../types/auth";

export const login = async (
    request: LoginRequest
): Promise<AuthResponse> => {

    const response = await api.post<AuthResponse>(
        "/api/auth/login",
        request
    );

    return response.data;
};

export const register = async (
    request: RegisterRequest
): Promise<AuthResponse> => {

    const response = await api.post<AuthResponse>(
        "/api/auth/register",
        request
    );

    return response.data;
};