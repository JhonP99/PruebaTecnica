import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    role?: "USER" | "ADMIN";
}

function ProtectedRoute({
                            children,
                            role,
                        }: ProtectedRouteProps) {

    const auth = useAppSelector(state => state.auth);

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (role && auth.role !== role) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;