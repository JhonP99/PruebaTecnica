import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import LoanFormPage from "../pages/LoanRequestPage.tsx";
import AdminDashboardPage from "../pages/AdminDashboard";
import RegisterPage from "../pages/RegisterPage";

function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={<DashboardPage />} />

            <Route path="/loan/new" element={<LoanFormPage />} />

            <Route path="/admin" element={<AdminDashboardPage />} />

            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
}

export default AppRouter;