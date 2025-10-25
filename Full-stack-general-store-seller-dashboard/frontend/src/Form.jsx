import { useState } from "react";

const Form = ({ getAllItems }) => {
    const [item, setItem] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleItem = (e) => {
        setItem(e.target.value);
    };
    const handlePrice = (e) => {
        setPrice(e.target.value);
    };
    const handleDescription = (e) => {
        setDescription(e.target.value);
    };
    const handleQuantity = (e) => {
        setQuantity(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const itemDetails = {
            item: item,
            description:description,
            quantity: quantity,
            price: price,
        }
        try {
            const response = await fetch(`http://localhost:3000/dashboard/add`, {
                method: "POST",
                body: JSON.stringify(itemDetails),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(response.ok){
                await getAllItems();
                setItem("");
                setDescription("");
                setPrice("");
                setQuantity("");
            }
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <form className="m-4 border-2 border-gray-300 rounded-md px-2 py-4 flex gap-4">
            <div>
                <label className="text-md font-medium text-blue-500" htmlFor="item">Item : </label>
                <input className="appearance-none border focus:outline-none bg-transparent px-2 py-1 rounded-md"
                    id="item" name="item" value={item} onChange={handleItem} />
            </div>
            <div>
                <label className="text-md font-medium text-blue-500" htmlFor="description">Description : </label>
                <input className="appearance-none border focus:outline-none bg-transparent px-2 py-1 rounded-md"
                    id="description" name="description" value={description} onChange={handleDescription} />
            </div>
            <div>
                <label className="text-md font-medium text-blue-500" htmlFor="price">Price : </label>
                <input className="appearance-none border focus:outline-none bg-transparent px-2 py-1 rounded-md"
                    id="price" name="price" value={price} onChange={handlePrice} />
            </div>
            <div>
                <label className="text-md font-medium text-blue-500" htmlFor="quantity">Quantity : </label>
                <input className="appearance-none border focus:outline-none bg-transparent px-2 py-1 rounded-md"
                    id="quantity" name="quantity" value={quantity} onChange={handleQuantity} />
            </div>
            <button className="bg-blue-500 text-white px-2 py-1 font-medium rounded-md cursor-pointer" onClick={handleSubmit}>Add Item</button>
        </form>
    )
};

export default Form;