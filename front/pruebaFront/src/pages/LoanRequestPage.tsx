import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { requestLoan } from "../api/loan.api";

function LoanRequestPage() {

    const navigate = useNavigate();

    const [amount, setAmount] = useState("");

    const [termMonths, setTermMonths] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            await requestLoan({
                amount: Number(amount),
                termMonths: Number(termMonths),
            });
            navigate("/dashboard");

        } catch {
            setError("Unable to submit your loan request.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: "500px", margin: "40px auto"}} >
            <h1>Loan Request</h1>
            <p> Complete the information below to request a new loan. </p>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px"}}>
                    <label> Amount </label>
                    <br/>
                    <input
                        type="number"
                        min={1}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="100000"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "20px"}} >
                    <label> Term (Months) </label>
                    <br />
                    <input
                        type="number"
                        min={1}
                        value={termMonths}
                        onChange={(e) => setTermMonths(e.target.value)}
                        placeholder="12"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                        }}
                    />
                </div> {error && (<p style={{ color: "red" }}> {error} </p> )}

                <button type="submit" disabled={loading} >
                    {loading ? "Submitting..." : "Submit Request"}
                </button>
            </form>
            <br />
            <Link to="/dashboard">
                Back to Dashboard
            </Link>
        </div>
    );
}

export default LoanRequestPage;