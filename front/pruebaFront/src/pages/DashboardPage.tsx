import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authService from "../services/auth.service";

import { logout } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { getMyLoans } from "../api/loan.api";

import type { Loan } from "../types/loan";

function DashboardPage() {

    const auth = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [loans, setLoans] = useState<Loan[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadLoans();

    }, []);

    async function loadLoans() {

        try {

            setLoading(true);

            const response = await getMyLoans();

            setLoans(response);

        } catch {

            setError("Unable to load your loans.");

        } finally {

            setLoading(false);

        }

    }

    function handleLogout() {

        authService.logout();

        dispatch(logout());

        navigate("/login");

    }

    return (

        <div>

            <h1>User Dashboard</h1>

            <h3>Welcome {auth.username}</h3>

            <Link to="/loan/request">

                <button>

                    Request Loan

                </button>

            </Link>

            <button onClick={handleLogout}>

                Logout

            </button>

            <hr />

            <h2>My Loans</h2>

            {loading && <p>Loading loans...</p>}

            {error && <p>{error}</p>}

            {!loading && loans.length === 0 && (

                <p>You have no loan requests.</p>

            )}

            {loans.length > 0 && (

                <table>

                    <thead>

                    <tr>

                        <th>ID</th>

                        <th>Amount</th>

                        <th>Months</th>

                        <th>Status</th>

                        <th>Created At</th>

                    </tr>

                    </thead>

                    <tbody>

                    {loans.map((loan) => (

                        <tr key={loan.id}>

                            <td>{loan.id}</td>

                            <td>${loan.amount.toLocaleString()}</td>

                            <td>{loan.termMonths}</td>

                            <td>{loan.status}</td>

                            <td>
                                {new Date(
                                    loan.createdAt
                                ).toLocaleString()}
                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            )}

        </div>

    );

}

export default DashboardPage;