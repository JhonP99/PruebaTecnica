import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authService from "../services/auth.service";

function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setMessage("");
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            setLoading(true);
            const response = await authService.register({
                username,
                password,
                role: "USER"
            });

            setMessage(response.message);
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch {
            setError("Unable to register user.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div style={{ maxWidth: "420px", margin: "60px auto" }} >
            <h1>Create Account</h1>
            <p> Register to request loans. </p>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "18px" }}>
                    <label>Username</label>
                    <br />
                    <input
                        type="text"
                        placeholder="user@test.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "10px"
                        }}
                    />
                </div>
                <div style={{ marginBottom: "18px" }}>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "10px"
                        }}
                    />
                </div>
                <div style={{ marginBottom: "18px" }}>
                    <label>Confirm Password</label>
                    <br />
                    <input
                        type="password"
                        placeholder="********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "10px"
                        }}
                    />
                </div> {message && ( <p style={{ color: "green" }}> {message}</p> )}
                {error && ( <p style={{ color: "red" }}> {error} </p>)}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px"
                    }}
                > {loading ? "Creating account..." : "Create Account"}
                </button>
            </form>
            <hr style={{ margin: "25px 0" }} />
            <p> Already have an account? </p>
            <Link to="/login">
                <button style={{ width: "100%",padding: "12px" }} > Back to Login </button>
            </Link>
        </div>
    );
}

export default RegisterPage;