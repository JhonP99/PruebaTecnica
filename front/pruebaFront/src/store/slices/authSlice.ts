import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../../types/auth";

interface AuthState {
    token: string | null;
    username: string | null;
    role: "USER" | "ADMIN" | null;
    isAuthenticated: boolean;
}

const token = localStorage.getItem("token");

let username: string | null = null;
let role: "USER" | "ADMIN" | null = null;

if (token) {
    try {

        const payload = jwtDecode<JwtPayload>(token);

        username = payload.sub;
        role = payload.role;

    } catch {

        localStorage.removeItem("token");

    }
}

const initialState: AuthState = {

    token,

    username,

    role,

    isAuthenticated: !!token && !!role,

};

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        loginSuccess(
            state,
            action: PayloadAction<{
                token: string;
                username: string;
                role: "USER" | "ADMIN";
            }>
        ) {

            state.token = action.payload.token;
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.isAuthenticated = true;

            localStorage.setItem(
                "token",
                action.payload.token
            );

        },

        logout(state) {

            state.token = null;
            state.username = null;
            state.role = null;
            state.isAuthenticated = false;

            localStorage.removeItem("token");

        },

    },

});

export const {
    loginSuccess,
    logout,
} = authSlice.actions;

export default authSlice.reducer;