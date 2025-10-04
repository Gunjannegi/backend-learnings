
import axios from "axios";
import React, { useEffect, useState } from "react"
import UsersList from "./UsersList";

function App() {

  const [username, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [uId,setUId] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/getAllUsers`);
      setData(response?.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const handleUserName = (e) => {
    setUserName(e.target.value)
  };

  const handlephoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username: username,
      email: email,
      phoneNumber: phoneNumber
    }
    if (editMode && uId) {
      try {
        const response = await axios.put(`http://localhost:3000/users/${uId}`,{...payload,userId:uId});
        if (response.status === 200) {
          await getAllUsers();
          // clear edit state and form
          setEditMode(false);
          setUId("");
          setUserName("");
          setEmail("");
          setPhoneNumber("");
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }
    try {
      const response = await axios.post(`http://localhost:3000/users/addUser`, payload);
      if (response.status === 201) {
        // refresh list from server
        const newData = await getAllUsers();
        // clear form
        setUserName("");
        setEmail("");
        setPhoneNumber("");
        // ensure state updated (getAllUsers already set data)
        if (newData?.data) setData(newData.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/users/${id}`);
      if (response.status === 200) {
        await getAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (uData) => {
    console.log(uData);
    setUserName(uData.username);
    setPhoneNumber(uData.phoneNumber);
    setEmail(uData.email);
    setEditMode(true);
    setUId(uData.userId);
  }
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="font-bold text-4xl">Booking Application</div>
      <form onSubmit={handleFormSubmit} className="mt-5 border-2 border-blue-100 p-4 rounded-lg bg-blue-50">
        <label htmlFor="username" className="text-blue-500">Username</label><br />
        <input value={username} onChange={handleUserName} id="username" name="username" type="text" className="border-2 rounded-md border-blue-300 mb-4" /><br />
        <label htmlFor="phoneNumber" className="text-blue-500">Phone Number</label><br />
        <input value={phoneNumber} onChange={handlephoneNumber} id="phoneNumber" name="phoneNumber" type="text" className="border-2 rounded-md border-blue-300 mb-4" /><br />
        <label htmlFor="email" className="text-blue-500" >Email</label><br />
        <input value={email} onChange={handleEmail} id="email" name="email" type="email" className="border-2 rounded-md border-blue-300" /><br />
        <button className="mt-4 border-2 border-blue-300 px-1 rounded-md cursor-pointer">Save</button>
      </form>
      <UsersList userData={data} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  )
}

export default App
