import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import loanReducer from "./slices/loanSlice";

export const store = configureStore({

    reducer: {

        auth: authReducer,

        loan: loanReducer,

    },

});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;