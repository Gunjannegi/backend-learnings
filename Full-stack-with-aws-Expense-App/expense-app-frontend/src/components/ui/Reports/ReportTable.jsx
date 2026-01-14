import { useState } from "react";

const ReportTable = ({ title, columnLabel, data, fileName }) => {
  const [open, setOpen] = useState(false);

  const downloadCSV = () => {
    if (!data.length) return;

    const headers = [columnLabel, "Total Expense"];
    const rows = data.map((item) => [item.label, item.amount]);

    const csvContent =
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "report.csv";
    link.click();

    URL.revokeObjectURL(url);
    setOpen(false);
  };

  return (
    <div className="relative mx-auto mt-6 bg-white rounded-xl shadow-md p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center w-full">
          {title}
        </h2>

        {/* Three dot menu */}
        <div className="absolute top-5 right-5">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-full hover:bg-gray-100 font-extrabold"
          >
            ⋮
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
              <button
                onClick={downloadCSV}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Download CSV
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
              <th className="px-4 py-3 text-left">{columnLabel}</th>
              <th className="px-4 py-3 text-right">Total Expense (₹)</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-4 py-6 text-center text-gray-500">
                  No expenses found
                </td>
              </tr>
            ) : (
              data.map(({ label, amount }) => (
                <tr key={label} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{label}</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">
                    ₹{amount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
