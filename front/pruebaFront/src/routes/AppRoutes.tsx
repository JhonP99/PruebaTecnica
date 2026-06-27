import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import AdminDashboard from "../pages/AdminDashboard";
import LoanRequestPage from "../pages/LoanRequestPage";
import NotFoundPage from "../pages/NotFoundPage";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

    return (

        <Routes>

            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/register" element={<RegisterPage />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute role="USER">
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin"
                element={
                    <ProtectedRoute role="ADMIN">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/loan/request"
                element={
                    <ProtectedRoute role="USER">
                        <LoanRequestPage />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<NotFoundPage />} />

        </Routes>

    );

}

export default AppRoutes;