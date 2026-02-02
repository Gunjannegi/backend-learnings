import { useEffect, useState } from "react";
import DailyReport from "./DailyReport";
import WeeklyReport from "./WeeklyReport";
import MonthlyReport from "./MonthlyReport";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [expenses, setExpenses] = useState([]);

  const getExpenses = async () => {
    try {
      const response = await fetch("http://localhost:3000/expenses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch expenses");
      }

      const result = await response.json();
      setExpenses(result?.data || result || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className=" px-3 sm:px-6 py-4">
      <div className="mx-auto w-full sm:w-11/12 md:w-4/5 rounded-xl border bg-white overflow-hidden">

        {/* Tabs */}
        <div className="flex border-b bg-gray-50 overflow-x-auto">
          {["daily", "weekly", "monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 capitalize text-sm font-medium whitespace-nowrap
                ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-600 bg-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          {activeTab === "daily" && <DailyReport expenses={expenses} />}
          {activeTab === "weekly" && <WeeklyReport expenses={expenses} />}
          {activeTab === "monthly" && <MonthlyReport expenses={expenses} />}
        </div>
      </div>
    </div>
  );
};

export default Reports;
