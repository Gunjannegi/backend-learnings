import { ROWS_OPTIONS } from "@/components/Basic/const";
import { useState, useMemo, useEffect } from "react";

const DEFAULT_ROWS = 5;

const ReportTable = ({ title, columnLabel, data = [], fileName }) => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Rows per page (persisted)
  const [rowsPerPage, setRowsPerPage] = useState(() => {
    return Number(localStorage.getItem("rowsPerPage")) || DEFAULT_ROWS;
  });

  // Save rowsPerPage to localStorage
  useEffect(() => {
    localStorage.setItem("rowsPerPage", rowsPerPage);
  }, [rowsPerPage]);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Safety: reset page if data/pages change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, rowsPerPage]);

  // CSV Download
  const downloadCSV = () => {
    if (!data.length) return;

    const headers = [columnLabel, "Total Expense"];
    const rows = data.map((item) => [item.label, item.amount]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

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
      <div className="flex items-center justify-between mb-4 relative">
        <h2 className="text-xl font-semibold text-gray-800 text-center w-full">
          {title}
        </h2>

        <div className="absolute right-0 top-0">
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
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan="2"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No expenses found
                </td>
              </tr>
            ) : (
              paginatedData.map(({ label, amount }) => (
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

        {/* Pagination */}

        <div className="flex justify-between items-center mt-4">
          {/* Rows per page */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded-md px-2 py-1"
            >
              {ROWS_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Page buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border text-sm disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md text-sm border
                      ${currentPage === page
                      ? "bg-blue-500 text-white border-blue-500"
                      : "hover:bg-gray-100"
                    }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReportTable;
