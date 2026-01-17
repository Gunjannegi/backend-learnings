const ExpenseList = ({ expenses = [], pagination, currentPage, onPageChange, onDelete }) => {
  const totalPages = pagination?.totalPages;
  return (
    <div className="mx-auto bg-white shadow-lg rounded-xl p-6 min-h-[473px]">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Expense List</h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No expenses added yet.</p>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-left">
                <th className="p-3">Description</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Category</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="p-3">{expense.description}</td>
                  <td className="p-3 text-green-600 font-medium">
                    ₹{parseFloat(expense.amount).toFixed(2)}
                  </td>
                  <td className="p-3">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">{expense.category}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => onDelete?.(expense.id)}
                      className="text-red-500 hover:text-red-600 font-medium cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
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
          )}
        </>
      )}
    </div>
  );
};

export default ExpenseList;
