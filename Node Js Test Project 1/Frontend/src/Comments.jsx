import { useEffect } from "react";
import { useState } from "react";

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [isComment, setIsComment] = useState(false);
    const [enteredComment, setEnteredComment] = useState("");
    const getAllComments = async () => {
        const response = await fetch(`http://localhost:3000/comment/getAllComments/${postId}`);
        const data = await response.json();
        setComments(data);
    }
    useEffect(() => {
        getAllComments();
    }, []);

    const handleComment = (e) => {
        setEnteredComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const addedComment = {
            postId: postId,
            comment: enteredComment
        }
        try {
            const response = await fetch(`http://localhost:3000/comment/add`, {
                method: 'POST',
                body: JSON.stringify(addedComment),
                headers: {
                    'Content-Type': 'Application/json'
                }
            });
            setEnteredComment("");
            await getAllComments();

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="flex flex-col items-center">
            <button className="text-white font-medium mb-2 cursor-pointer" onClick={() => { setIsComment(prev=>!prev) }}>Comments</button>
            {isComment &&
                <>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input id="comment" onChange={handleComment} value={enteredComment} className="rounded p-1 bg-white" />
                        <button className="bg-white rounded-md p-1 text-black font-medium cursor-pointer">Send</button>
                    </form>
                    <ul>
                        {comments.map(comment => {
                            return (
                                <li className="flex gap-2 mt-2">
                                    <h1 className="text-yellow-400">Anonymous - </h1>
                                    <p className="text-white">{comment.comment}</p>
                                </li>
                            )
                        })}
                    </ul>
                </>}
        </div>

    )
};

export default Comments;