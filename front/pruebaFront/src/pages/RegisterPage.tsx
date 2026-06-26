import { Link } from "react-router-dom";

function RegisterPage() {
    return (
        <div className="page">
            <div className="card">
                <h1>Create Account</h1>

                <p>Register to request a loan.</p>

                <form>
                    <div>
                        <label htmlFor="fullName">Full Name</label>

                        <input
                            id="fullName"
                            type="text"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            type="email"
                            placeholder="john@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            placeholder="********"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>

                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="********"
                        />
                    </div>

                    <button type="submit">
                        Register
                    </button>
                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;