import Comments from "./Comments";

const PostsList = ({posts}) => {
  
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="mt-8 text-black text-2xl font-medium">Posts</h1>
            <ul className="mt-2 p-4">
                {posts.map(post => {
                    return (
                        <li>
                            <div className="flex flex-col justify-center items-center mb-4 p-4 bg-yellow-950 rounded">
                                <img src={post.link} alt="image" width={'200px'} height={'200px'} className="border-2 rounded-md border-white" />
                                <div className="flex flex-row items-center justify-center">
                                    <h1 className="font-medium text-white">User - </h1>
                                    <p className="text-white">{post.description}</p>
                                </div>
                                <Comments postId={post.id} />
                            </div>

                        </li>
                    )
                })}
            </ul>

        </div>
    )

};
export default PostsList;