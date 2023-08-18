import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchSinglePost } from "../API";

export default function SinglePost() {
    let { id } = useParams();
    const [post, setPost] = useState([]);
    const [error, setError] =useState(null);
    const { pathname } = useLocation();
    console.log(pathname);

    useEffect(() => {
        async function getSinglePost() {
            const APIData =  await fetchSinglePost(id);
            if (APIData.success) {
                setPost(APIData.data.posts);
            } else {
                setError(APIData.error);
            }
        }
        getSinglePost();
    }, [id]);

    return (
        <>
            <h2>Post Details</h2>
            <div>
                {post && (
                    <div className="postdetails">
                        <h3>{post.title}</h3>
                        <h4>{post.author.username}</h4>
                        <h4>{post.price}</h4>
                        <p>{post.description}</p>
                    </div>
                )}
                {error && <p>{error}</p>}                
            </div>
        </>
    )
}