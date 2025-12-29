import { useState } from "react";
import Toast from "./Basic/Toast";

const ExpenseForm = ({ getExpenses }) => {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        date: "",
        category: "",
    });
    const [aiLoading, setAiLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const categories = ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Health", "Education", "Rent", "Groceries", "Other"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.description || !formData.amount || !formData.date || !formData.category) {
            alert("Please fill all fields!");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/expenses/add`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setToast({ message: data?.message, type: 'success' });
            await getExpenses();
            setFormData({ description: "", amount: "", date: "", category: "" });

        } catch (err) {
            setToast({ message: err.message, type: "error" });
            console.log(err);
        }

    };

    const handleBlur = async (e) => {
        const value = e.target.value;
        if (value !== "") {
            try {
                setAiLoading(true);
                const response = await fetch(`http://localhost:3000/ask`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')
                    },
                    body: JSON.stringify({ prompt: value }),
                });
                const data = await response.json();
                setFormData((prev) => ({ ...prev, category: data.suggest_category }))
            } catch (err) {
                setToast({ message: err.message, type: "error" });
            } finally {
                setAiLoading(false)
            }
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4"
            >
                <h2 className="text-xl font-semibold text-gray-700">Add New Expense</h2>

                {/* Description */}
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Description</label>
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

                {/* Amount */}
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Amount</label>
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
                    <label className="block text-gray-600 font-medium mb-1">Date</label>
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
                    <div className="flex gap-2 items-center">
                        <label className="block text-gray-600 font-medium mb-1">Category</label>
                        {aiLoading && <span className="text-pink-500 text-xs">Ai suggesting...</span>}
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
                    className="w-full bg-red-900 text-white py-2 rounded-lg font-medium hover:bg-red-800 transition cursor-pointer"
                >
                    Add Expense
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
