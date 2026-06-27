import { jwtDecode } from "jwt-decode";
import * as authApi from "../api/auth.api.ts";
import type {
    LoginRequest,
    RegisterRequest,
    JwtPayload
} from "../types/auth.ts";

class AuthService {

    async login(request: LoginRequest) {

        const response = await authApi.login(request);

        if (!response.token) {
            throw new Error(response.message);
        }

        localStorage.setItem("token", response.token);

        const payload = jwtDecode<JwtPayload>(response.token);

        return {
            token: response.token,
            username: payload.sub,
            role: payload.role
        };

    }

    async register(request: RegisterRequest) {
        return authApi.register(request);
    }

    logout() {
        localStorage.removeItem("token");
    }

    getToken() {
        return localStorage.getItem("token");
    }

}

export default new AuthService();