import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { useAppDispatch } from "../store/hooks";
import { loginSuccess } from "../store/slices/authSlice";

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            const user = await authService.login({
                username,
                password,
            });

            dispatch(loginSuccess({
                token: user.token,
                username: user.username,
                role: user.role,
            }));
            navigate( user.role === "ADMIN" ? "/admin" : "/dashboard" );
        } catch {
            setError("Invalid username or password.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: "420px", margin: "60px auto"}} >
            <h1>Loan </h1>
            <h1>Management</h1>
            <p> Sign in to access your account. </p>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px"}} >
                    <label> Username </label>
                    <br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="user@test.com"
                        required
                        style={{ width: "100%", padding: "10px"}}
                    />
                </div>
                <div
                    style={{ marginBottom: "20px"}} >
                    <label> Password </label>
                    <br />
                    <input type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        required
                        style={{ width: "100%", padding: "10px" }} />
                </div> {error && ( <p style={{ color: "red"}} > {error} </p> )}

                <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px"}} >
                    {loading ? "Signing in..." : "Login"}
                </button>
            </form>
            <hr style={{ margin: "25px 0" }} />
            <p> Don't have an account? </p>
            <Link to="/register">
                <button style={{ width: "100%", padding: "12px"}} >
                    Create Account
                </button>
            </Link>
        </div>
    );
}

export default LoginPage;