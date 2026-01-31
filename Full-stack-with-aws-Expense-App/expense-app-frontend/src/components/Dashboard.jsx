import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const Dashboard = () => {
  const [expenseData, setExpenseData] = useState({});
  const [editExpenseData, setEditExpenseData] = useState({});
  const [page, setPage] = useState(1);
  const DEFAULT_ROWS = 5;
  const [rowsPerPage, setRowsPerPage] = useState(() => {
    return Number(localStorage.getItem("rowsPerPageForDashboard")) || DEFAULT_ROWS;
  });
  // Fetch expenses
  const getExpenses = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/expenses?page=${page}&limit=${rowsPerPage}`,
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

  const handleEdit = async(expense)=>{
     setEditExpenseData(expense);
  };

  // Save rowsPerPageForDashboard to localStorage
  useEffect(() => {
    localStorage.setItem("rowsPerPageForDashboard", rowsPerPage);
  }, [rowsPerPage]);


  //Fetch on mount & page change
  useEffect(() => {
    getExpenses();
  }, [page, rowsPerPage]);

  return (
    <div className="bg-gray-100 p-6 flex flex-col lg:flex-row gap-6 h-[87vh]">
      {/* Left - Form */}
      <div className="w-full lg:w-2/5">
        <ExpenseForm getExpenses={getExpenses} editExpenseData={editExpenseData} />
      </div>

      {/* Right - List */}
      <div className="w-full lg:w-2/3">
        <ExpenseList
          expenses={expenseData?.data || []}
          pagination={expenseData?.pagination}
          currentPage={page}
          onPageChange={setPage}
          onDelete={handleDelete}
          onEdit={handleEdit}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
