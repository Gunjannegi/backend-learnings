const ItemList = ({ itemData, getAllItems }) => {
    const handleQuantity = async (id, soldQuantity) => {
        try {
            const response = await fetch(`http://localhost:3000/dashboard/update/${id}/${soldQuantity}`, {
                method: "PUT"
            });
            if (response.ok) {
                await getAllItems();
            }

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="m-4 border-2 border-gray-300 rounded-md px-2 py-4">
            <table className="w-full">
                <thead className="bg-blue-400 text-white font-medium">
                    <th className="py-2 rounded-l-md">Item</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th></th>
                    <th></th>
                    <th className="rounded-r-md"></th>
                </thead>
                <tbody>
                    {itemData?.map(item => (
                        <tr key={item.id}>
                            <td className="text-center">{item.item}</td>
                            <td className="text-center">{item.description}</td>
                            <td className="text-center">{item.price}</td>
                            <td className="text-center">{item.quantity}</td>
                            <td><button className="cursor-pointer text-center text-blue-500 font-medium hover:text-blue-600" disabled={item.quantity <= 0}
                                onClick={() => handleQuantity(item.id, 1)}>Buy 1</button></td>
                            <td><button className="cursor-pointer text-center text-blue-500 font-medium hover:text-blue-600" disabled={item.quantity <= 0 || item.quantity < 2}
                                onClick={() => handleQuantity(item.id, 2)}>Buy 2</button></td>
                            <td><button className="cursor-pointer text-center text-blue-500 font-medium hover:text-blue-600" disabled={item.quantity <= 0 || item.quantity < 3}
                                onClick={() => handleQuantity(item.id, 3)}>Buy 3</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default ItemList;