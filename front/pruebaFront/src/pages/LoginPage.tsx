import { Link } from "react-router-dom";

function LoginPage() {
    return (
        <div className="page">
            <div className="card">
                <h1>Loan Management</h1>

                <p>Sign in to continue</p>

                <form>
                    <div>
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="example@email.com"
                        />
                    </div>

                    <div>
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="********"
                        />
                    </div>

                    <button type="submit">
                        Login
                    </button>
                </form>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

                <p>
                    Demo:
                    <Link to="/">
                        User Dashboard
                    </Link>

                    {" | "}

                    <Link to="/admin">
                        Admin Dashboard
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;