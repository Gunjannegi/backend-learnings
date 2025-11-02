import { useState } from "react"
import PostsList from "./PostsList"
import { useEffect } from "react";


function App() {

  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        getAllPosts();
    },[]);

  const getAllPosts = async () => {
          const response = await fetch(`http://localhost:3000/post/getAllPosts`);
          const data = await response.json();
          setPosts(data);
      }

  const handleLink = (e) => {
    setLink(e.target.value);
  }

  const handleDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      link: link,
      description: description
    }
    try {
      const response = await fetch(`http://localhost:3000/post/add`, {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          'Content-Type': 'Application/json'
        }
      });
      setLink("");
      setDescription("");
      await getAllPosts();
    } catch (err) {
      console.log(err)
    }


  }
  return (
    <div className="flex flex-col justify-between items-center mt-10">
      <div>
        <h1 className="text-2xl font-bold text-black">Create a Post</h1>
        <form onSubmit={handleSubmit} className="mt-5 border-2 border-yellow-900 rounded-lg p-4">
          <label htmlFor="postLink" className="text-lg text-yellow-800 font-medium">Post link: </label><br />
          <input id="postLink" name="postLink" value={link} onChange={handleLink} className="border-yellow-700 border-2 rounded-md p-0.5 hover:border-yellow-600 mb-2"/><br />
          <label htmlFor="postDescription" className="text-lg text-yellow-800 font-medium">Post Description: </label><br />
          <input id="postDescription" value={description} name="postDescription" onChange={handleDescription} className="border-yellow-800 border-2 rounded-md p-0.5 hover:border-yellow-600"/><br />
          <button className="border-2 bg-yellow-800 text-white font-medium p-2 rounded-lg mt-4 cursor-pointer hover:bg-yellow-700">Create Post</button>
        </form>
      </div>
      <div>
        <PostsList posts={posts}/>
      </div>
    </div>
  )
}

export default App
