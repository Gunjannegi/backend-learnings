import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const Dashboard = () => {
  const [expenseData, setExpenseData] = useState({});
  const [page, setPage] = useState(1);
  const LIMIT = 10;

  // Fetch expenses
  const getExpenses = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/expenses?page=${page}&limit=${LIMIT}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch expenses");
      }

      const result = await response.json();
      setExpenseData(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/expenses/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete expense");
      }

      // Handle empty page after delete
      if (expenseData?.data?.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        getExpenses();
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  //Fetch on mount & page change
  useEffect(() => {
    getExpenses();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col lg:flex-row gap-6">
      {/* Left - Form */}
      <div className="w-full lg:w-2/5">
        <ExpenseForm getExpenses={getExpenses} />
      </div>

      {/* Right - List */}
      <div className="w-full lg:w-2/3">
        <ExpenseList
          expenses={expenseData?.data || []}
          pagination={expenseData?.pagination}
          currentPage={page}
          onPageChange={setPage}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
