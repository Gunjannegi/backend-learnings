import { useEffect, useState } from "react";
import DailyReport from "./DailyReport";
import WeeklyReport from "./WeeklyReport";
import MonthlyReport from "./MonthlyReport";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [expenses, setExpenses] = useState([]);
  // Function to fetch all expenses from backend
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

  //Fetch on mount
  useEffect(() => {
    getExpenses();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto w-4/5 rounded-xl border bg-white overflow-hidden">

        {/* Tabs */}
        <div className="flex border-b bg-gray-50">
          {["daily", "weekly", "monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 capitalize text-sm font-medium cursor-pointer
                ${activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600 bg-white"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "daily" && <DailyReport expenses={expenses}/>}
          {activeTab === "weekly" && <p><WeeklyReport expenses={expenses}/></p>}
          {activeTab === "monthly" && <p><MonthlyReport expenses={expenses}/></p>}
        </div>
      </div>

    </div>
  );
};

export default Reports;
