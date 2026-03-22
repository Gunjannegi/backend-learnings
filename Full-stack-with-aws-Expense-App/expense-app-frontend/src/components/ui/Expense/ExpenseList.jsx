import { useState } from "react";
import { ROWS_OPTIONS } from "../../Basic/const";
import { FaEdit, FaDownload, FaTrash } from "react-icons/fa";
import DeleteConfirmationPopup from "../../Basic/DeleteConfirmationPopup";
import { formatDate } from "../../Basic/dateUtils";
import { BsClockHistory } from 'react-icons/bs';
import ExportHistoryPanel from "./ExpenseHistoryPanel";
import { ImSpinner2 } from 'react-icons/im';
import Toast from "@/components/Basic/Toast";
import { FaTrophy } from 'react-icons/fa';
import LeaderboardModal from "@/components/LeaderboardModal";
import { useAuth } from "@/components/context/auth";

const ExpenseList = ({
  expenses = [],
  pagination,
  currentPage,
  onPageChange,
  onDelete,
  onEdit,
  rowsPerPage,
  setRowsPerPage
}) => {
  const totalPages = pagination?.totalPages || 1;
  const [deleteId, setDeleteId] = useState(null);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);
  const [isExportLoading, setIsExportLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const { userInfo } = useAuth();
  

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) onDelete?.(deleteId);
    setIsDeletePopup(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setIsDeletePopup(false);
    setDeleteId(null);
  };

  const handleExportList = async () => {
    setIsExportLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/expenses/download`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')
        }
      });
      const data = await response.json();
      let a = document.createElement("a");
      a.href = data.fileUrl;
      a.click();
      setToast({message:"File downloaded successfully",type:"success"});

    } catch (err) {
      console.log(err);
      setToast({message:"Something went wrong",type:"error"});
    } finally {
      setIsExportLoading(false);
    }
  }

  return (
    <div className="mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6 min-h-[450px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
          Expense List
        </h2>
        {userInfo?.isPremium && <div className="flex gap-4">
          <FaTrophy className="cursor-pointer text-blue-950 opacity-70 hover:opacity-100"
          title="Leaderboard"
          onClick={() => setShowLeaderboard(true)}/>
          <BsClockHistory className="cursor-pointer text-blue-950 opacity-70 hover:opacity-100"
            title="Export History"
            onClick={() => setIsHistoryPanelOpen(true)} />
          {isExportLoading ?
            <ImSpinner2
            /> : <FaDownload
              className="cursor-pointer text-blue-950 opacity-70 hover:opacity-100"
              title="Export List"
              onClick={() => handleExportList()}
            />}
        </div>}
      </div>
      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center py-6">
          No expenses added yet.
        </p>
      ) : (
        <>
          {/* ================= MOBILE VIEW (CARDS) ================= */}
          <div className="space-y-4 sm:hidden">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-800">
                    {expense.description}
                  </h3>
                  <span className="font-semibold text-gray-900">
                    ₹{parseFloat(expense.amount).toFixed(2)}
                  </span>
                </div>

                {expense.note && (
                  <p className="text-sm text-gray-500 mt-1">
                    {expense.note}
                  </p>
                )}

                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {formatDate(expense.date)}
                  </p>
                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {expense.category}
                  </p>
                </div>

                <div className="flex justify-end gap-4 mt-3">
                  <FaEdit
                    className="cursor-pointer text-blue-900 opacity-70 hover:opacity-100"
                    onClick={() => onEdit?.(expense)}
                  />
                  <FaTrash
                    className="cursor-pointer text-red-500 opacity-70 hover:opacity-100"
                    onClick={() => handleDeleteClick(expense.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP VIEW (TABLE) ================= */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-left">
                  <th className="p-3">Description</th>
                  <th className="p-3">Note</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Category</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{expense.description}</td>
                    <td className="p-3">{expense.note}</td>
                    <td className="p-3">
                      ₹{parseFloat(expense.amount).toFixed(2)}
                    </td>
                    <td className="p-3">{formatDate(expense.date)}</td>
                    <td className="p-3">{expense.category}</td>
                    <td className="p-3 flex justify-center gap-3">
                      <FaEdit
                        className="cursor-pointer text-blue-950 opacity-50 hover:opacity-100"
                        onClick={() => onEdit?.(expense)}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500 opacity-50 hover:opacity-100"
                        onClick={() => handleDeleteClick(expense.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION ================= */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  onPageChange(1);
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

            <div className="flex flex-wrap justify-center items-center gap-2">
              <button
                onClick={() => onPageChange((p) => Math.max(p - 1, 1))}
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
                    onClick={() => onPageChange(page)}
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
                  onPageChange((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md border text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </>
      )}

      <DeleteConfirmationPopup
        open={isDeletePopup}
        onClose={handleCancelDelete}
        onDelete={handleConfirmDelete}
        title={"Delete Expense"}
        message={"Are you sure you want to delete this expense?"}
      />
      {/* Export History Side Panel */}
      <ExportHistoryPanel
        isOpen={isHistoryPanelOpen}
        onClose={() => setIsHistoryPanelOpen(false)}
      />
      <LeaderboardModal open={showLeaderboard} onClose={setShowLeaderboard} />

    </div>
  );
};

export default ExpenseList;
