import { useEffect, useState } from "react";
import { getAllExpenses } from "../App";

const ExpenseForm = ({ isEdit, setIsEdit, editExpense, setExpenses }) => {
    const [eneteredPrice, setEnteredPrice] = useState();
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredCategory, setEnteredCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            setEnteredPrice(editExpense.price);
            setEnteredDescription(editExpense.description);
            setEnteredCategory(editExpense.category);
        }
    }, [isEdit])

    const priceChangeHandler = (e) => {
        setEnteredPrice(e.target.value)
    }
    const descriptionChangeHandler = (e) => {
        setEnteredDescription(e.target.value)
    }
    const categoryChangeHandler = (e) => {
        setEnteredCategory(e.target.value)
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let url = "http://localhost:3001/expense/add";
        let method = "POST"
        const expenseDetail = {
            price: parseInt(eneteredPrice),
            description: enteredDescription,
            category: enteredCategory
        }
        if (isEdit) {
            url = `http://localhost:3001/expense/update/${editExpense.id}`;
            method = "PUT"
        }
        try {
            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(expenseDetail),
                headers: {
                    'Content-Type': 'application/json'
                }
            }); if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Something went wrong', errorData);
            }
            const allExpense = await getAllExpenses();

            setExpenses(allExpense);
            setEnteredPrice('');
            setEnteredCategory('');
            setEnteredDescription('');
        } catch (error) {
            console.log('failed', error.message)
        } finally { setIsLoading(false); if (isEdit) setIsEdit(false); }
    }
    return (
        <>
            <form onSubmit={submitHandler} className="flex flex-col border-2 p-4 gap-6 mt-10 rounded-lg border-purple-400">
                <div>
                    <label htmlFor="price" className="text-purple-600">Price : </label>
                    <input type='number' id="price" name="price" className="border rounded-md text-purple-400" onChange={priceChangeHandler} value={eneteredPrice} required></input>
                </div>
                <div>
                    <label htmlFor="description" className="text-purple-600">Description : </label>
                    <input type='text' id="description" name="description" className="border rounded-md text-purple-400" onChange={descriptionChangeHandler} value={enteredDescription} required></input>
                </div>
                <div>
                    <label htmlFor="category" className="text-purple-600">Category : </label>
                    <select type='text' name="category" id="category" className="border rounded-md text-purple-400 cursor-pointer" onChange={categoryChangeHandler} value={enteredCategory} required>
                        <option value='Select an option'>Select an option</option>
                        <option value='Food'>Food</option>
                        <option value='Petrol'>Petrol</option>
                        <option value='Salary'>Salary</option>
                        <option value='Shoppng'>Shopping</option>
                        <option value='Repair'>Repair</option>
                        <option value='Furniture'>Furniture</option>
                        <option value='Fees'>Fees</option>
                        <option value='Others'>Others</option>
                    </select>
                </div>
                <div>
                    <button className="text-white bg-purple-600 p-2 rounded-md cursor-pointer">{isLoading ? "Adding" : "Add Expense"}</button>
                </div>
            </form>
        </>
    )
}

export default ExpenseForm;