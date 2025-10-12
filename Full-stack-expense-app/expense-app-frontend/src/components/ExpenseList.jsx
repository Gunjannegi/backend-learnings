
const ExpenseList = ({expenses,handleDelete,handleEdit}) => {
   

    return (
        <>
            <table className="border-2 mt-10 p-4 border-purple-500">
                <thead>
                    <tr className="border-2">
                        <th>Price</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th></th>
                        <th></th>
                    </tr>

                </thead>
                <tbody>
                    {Array.isArray(expenses) && expenses.map(expense => (
                        <tr key={expense.id} className="border-2">
                            <td className="p-4">{expense.price}</td>
                            <td className="p-4">{expense.category}</td>
                            <td className="p-4">{expense.description}</td>
                            <td onClick={()=>handleDelete(expense.id)} className="p-4 text-red-500 cursor-pointer underline">Delete</td>
                            <td onClick={()=>handleEdit(expense)} className="p-4 text-green-500 cursor-pointer underline">Edit</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
};
export default ExpenseList;