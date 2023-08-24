import { useState, useEffect } from "react";
import { fetchSinglePost } from "../API";
import { useParams } from "react-router-dom";

export default function SinglePost() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { postId } = useParams(); 

  useEffect(() => {
    async function getSinglePost() {
      const singlePostData = await fetchSinglePost(postId); 
      if (singlePostData.success) {
        setPost(singlePostData.data.post);
      } else {
        setError(singlePostData.error);
      }
    }
    getSinglePost();
  }, [postId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post">
      <h3>{post.title}</h3>
      <h4>{post.author.username}</h4>
      <h5>{post.price}</h5>
      <p>{post.content}</p>
      <div className="details">
        <button className="detailbutton">Send Message</button>
      </div>
    </div>
  );
}
