import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { logout } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/hooks";
import {
    approveLoan,
    rejectLoan,
    streamPendingLoans,
} from "../api/loan.api";
import type { Loan } from "../types/loan";

function AdminDashboard() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loans, setLoans] = useState<Loan[]>([]);
    useEffect(() => {
        streamPendingLoans((loan) => {
            setLoans((previous) => {
                const exists = previous.find(
                    l => l.id === loan.id
                );
                if (exists) {
                    return previous.map(l =>
                        l.id === loan.id ? loan : l
                    );
                }

                return [...previous, loan];
            });
        });
    }, []);

    async function handleApprove(id: number) {
        await approveLoan(id);
        setLoans(loans.filter(l => l.id !== id));
    }

    async function handleReject(id: number) {
        await rejectLoan(id);
        setLoans(loans.filter(l => l.id !== id));
    }

    function handleLogout() {
        authService.logout();
        dispatch(logout());
        navigate("/login");
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout}>
                Logout
            </button>
            <hr/>
            <h2>Pending Loans</h2>
            <table>
                <thead>
                <tr>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Months</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody> {loans.map((loan) => (
                    <tr key={loan.id}>
                        <td>{loan.username}</td>
                        <td> ${loan.amount.toLocaleString()} </td>
                        <td> {loan.termMonths} </td>
                        <td>{loan.status}</td>
                        <td>
                            <button onClick={() => handleApprove(loan.id)}>
                                Approve
                            </button>

                            <button onClick={() => handleReject(loan.id)}>
                                Reject
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;