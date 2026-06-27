import api from "./axios.api.ts";

import type {
    LoginRequest,
    RegisterRequest,
    AuthResponse,
} from "../types/auth";

export async function login(
    request: LoginRequest
): Promise<AuthResponse> {

    const response = await api.post<AuthResponse>(
        "/api/auth/login",
        request
    );

    return response.data;
}

export async function register(
    request: RegisterRequest
): Promise<AuthResponse> {

    const response = await api.post<AuthResponse>(
        "/api/auth/register",
        request
    );

    return response.data;
}