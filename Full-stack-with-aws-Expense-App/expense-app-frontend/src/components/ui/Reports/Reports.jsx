import { useState } from "react";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("daily");

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
        <div className="p-4">
          {activeTab === "daily" && <p>Daily report data</p>}
          {activeTab === "weekly" && <p>Weekly report data</p>}
          {activeTab === "monthly" && <p>Monthly report data</p>}
        </div>
      </div>

    </div>
  );
};

export default Reports;
