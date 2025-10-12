import { useEffect, useState } from "react"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"

export const getAllExpenses = async () => {
  try {
    const response = await fetch(`http://localhost:3001/expense/getAllExpenses`, {
      method: 'GET',
    }); if (!response.ok) {
      throw new Error('Something went wrong while getting the expenses');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('failed', error.message)
  }
}

function App() {
  const [expenses, setExpenses] = useState([]); // State to hold expenses
  const [isEdit,setIsEdit] = useState(false);
  const [editExpense, setEditExpense] = useState({})


  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await getAllExpenses();
      setExpenses(data);
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/expense/delete/${id}`, {
        method: 'DELETE',
      }); if (!response.ok) {
        throw new Error('Something went wrong while getting the expenses');
      }
      const data = await getAllExpenses();
      setExpenses(data);
    } catch (error) {
      console.log('failed', error.message)
    }
  };

  const handleEdit = (expense) =>{
      setIsEdit(true);
      setEditExpense(expense);
  };
  // console.log(expenses)
  return (
    <div className="flex flex-col justify-center items-center">
      <div className='text-2xl font-extrabold text-purple-500'>
        Expense App
      </div>
      <ExpenseForm isEdit={isEdit} editExpense={editExpense} setIsEdit={setIsEdit} setExpenses={setExpenses}/>
      <ExpenseList expenses={expenses} handleDelete={handleDelete} handleEdit={handleEdit}/>
    </div>
  )
}

export default App;
