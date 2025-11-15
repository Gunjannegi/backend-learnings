import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);

    // 🔹 Function to fetch all expenses from backend
    const getExpenses = async () => {
        try {
            const response = await fetch("http://localhost:3000/expenses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem('token')
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to fetch expenses");
            }

            const result = await response.json();

            // ✅ Adjust this depending on your backend response structure
            setExpenses(result?.data || result || []);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };


    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/expenses/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem('token')
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to delete expense");
            }

            // ✅ Refresh the list after successful deletion
             await getExpenses();

        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };


    // 🔹 Fetch on mount
    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col lg:flex-row gap-6">
            {/* Left - Form */}
            <div className="w-full lg:w-2/5">
                <ExpenseForm getExpenses={getExpenses} />
            </div>

            {/* Right - List */}
            <div className="w-full lg:w-2/3">
                <ExpenseList expenses={expenses} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default Dashboard;
