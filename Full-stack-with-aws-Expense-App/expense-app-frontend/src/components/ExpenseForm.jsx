import { useEffect, useRef, useState } from "react";
import Toast from "./Basic/Toast";

const ExpenseForm = ({ getExpenses, editExpenseData }) => {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        date: "",
        category: "",
        note: ""
    });

    const [aiLoading, setAiLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const isSubmitting = useRef(false);

    const isEditMode = Boolean(formData.id);

    const categories = [
        "Food",
        "Travel",
        "Shopping",
        "Bills",
        "Entertainment",
        "Health",
        "Education",
        "Rent",
        "Groceries",
        "Other"
    ];

    useEffect(() => {
        if (editExpenseData) {
            setFormData({
                id: editExpenseData.id,
                description: editExpenseData.description || "",
                amount: editExpenseData.amount || "",
                date: editExpenseData.date || "",
                category: editExpenseData.category || "",
                note: editExpenseData.note || ""
            });
        }
    }, [editExpenseData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.description || !formData.amount || !formData.date || !formData.category) {
            alert("Please fill required fields!");
            isSubmitting.current = false;
            return;
        }

        try {
            const url = isEditMode
                ? `http://localhost:3000/expenses/${formData.id}`
                : `http://localhost:3000/expenses/add`;

            const method = isEditMode ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token")
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            setToast({ message: data?.message, type: "success" });
            await getExpenses();

            setFormData({
                description: "",
                amount: "",
                date: "",
                category: "",
                note: ""
            });
        } catch (err) {
            setToast({ message: err.message, type: "error" });
            console.error(err);
        } finally {
            isSubmitting.current = false;
        }
    };

    const handleBlur = async (e) => {
        if (isSubmitting.current) return;

        const value = e.target.value;
        if (!value) return;

        try {
            setAiLoading(true);
            const response = await fetch("http://localhost:3000/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token")
                },
                body: JSON.stringify({ prompt: value })
            });

            const data = await response.json();
            setFormData((prev) => ({
                ...prev,
                category: data.suggest_category
            }));
        } catch (err) {
            setToast({ message: err.message, type: "error" });
        } finally {
            setAiLoading(false);
        }
    };

    const handleButtonMouseDown = () => {
        isSubmitting.current = true;
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="mx-auto w-full max-w-lg bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4"
            >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 text-center sm:text-left">
                    {isEditMode ? "Edit Expense" : "Add New Expense"}
                </h2>

                {/* Description */}
                <div>
                    <label className="block text-gray-600 font-medium mb-1">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter expense description"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                {/* Note */}
                <div>
                    <label className="block text-gray-600 font-medium mb-1">
                        Note
                    </label>
                    <input
                        type="text"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        placeholder="Optional note"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                {/* Amount */}
                <div>
                    <label className="block text-gray-600 font-medium mb-1">
                        Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-gray-600 font-medium mb-1">
                        Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                {/* Category */}
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <label className="text-gray-600 font-medium">
                            Category <span className="text-red-500">*</span>
                        </label>
                        {aiLoading && (
                            <span className="text-pink-500 text-xs">
                                AI suggesting...
                            </span>
                        )}
                    </div>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    onMouseDown={handleButtonMouseDown}
                    className="w-full bg-red-900 text-white py-2 rounded-lg font-medium hover:bg-red-800 transition active:scale-[0.99]"
                >
                    {isEditMode ? "Update Expense" : "Add Expense"}
                </button>
            </form>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
};

export default ExpenseForm;
