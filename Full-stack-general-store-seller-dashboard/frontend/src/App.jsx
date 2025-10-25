import { useState } from "react"
import Form from "./Form"
import ItemList from "./ItemList"
import { useEffect } from "react";


function App() {
  const [itemData, setItemData] = useState([]);
  const getAllItems = async() =>{
    try{
      const response = await fetch(`http://localhost:3000/dashboard`);
      const data = await response.json();
      setItemData(data);

    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
   getAllItems();
  },[]);

  return (
    <div className="border border-gray-300 w-fit m-auto mt-28 rounded-md">
      <h1 className="p-2 bg-blue-500 border-0 text-lg text-white font-semibold rounded-t-md mb-4">Dashboard</h1>
      <Form getAllItems={getAllItems}/>
      <ItemList itemData={itemData} getAllItems={getAllItems}/>
    </div>
  )
}

export default App
