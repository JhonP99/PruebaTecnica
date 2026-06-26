export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    role: "USER" | "ADMIN";
}

export interface AuthResponse {
    message: string;
    token: string | null;
}

export interface JwtPayload {
    sub: string;
    role: "USER" | "ADMIN";
    iat: number;
    exp: number;
}