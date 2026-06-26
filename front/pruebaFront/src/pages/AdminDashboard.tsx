function AdminDashboardPage() {
    return (
        <div className="page">

            <h1>Pending Loan Requests</h1>

            <table>

                <thead>

                <tr>

                    <th>User</th>

                    <th>Amount</th>

                    <th>Status</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                <tr>

                    <td>John Doe</td>

                    <td>$700.000</td>

                    <td>Pending</td>

                    <td>

                        <button>
                            Approve
                        </button>

                        <button>
                            Reject
                        </button>

                    </td>

                </tr>

                <tr>

                    <td>Jane Smith</td>

                    <td>$950.000</td>

                    <td>Pending</td>

                    <td>

                        <button>
                            Approve
                        </button>

                        <button>
                            Reject
                        </button>

                    </td>

                </tr>

                </tbody>

            </table>

        </div>
    );
}

export default AdminDashboardPage;