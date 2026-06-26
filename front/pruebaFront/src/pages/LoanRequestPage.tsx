import { Link } from "react-router-dom";

function LoanFormPage() {
    return (
        <div className="page">

            <h1>Loan Request</h1>

            <form>

                <div>

                    <label>Amount</label>

                    <input
                        type="number"
                        placeholder="100000"
                    />

                </div>

                <div>

                    <label>Description</label>

                    <textarea
                        placeholder="Purpose of the loan..."
                    />

                </div>

                <button type="submit">
                    Submit Request
                </button>

            </form>

            <br />

            <Link to="/">
                Back
            </Link>

        </div>
    );
}

export default LoanFormPage;