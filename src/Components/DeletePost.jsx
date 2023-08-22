import { useState, useEffect } from "react";
import { fetchSinglePost, deletePost } from "../API"; 
import { useParams, useNavigate } from "react-router-dom";

export default function DeletePost() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { postId } = useParams(); 
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try {
      const response = await deletePost(postId); 
      if (response.success) {
        navigate("/"); // Redirect to another page after successful deletion
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("An error occurred while deleting the post.");
    }
  };

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
        <button className="detailbutton" onClick={handleDelete}>
          Delete Post
        </button>
      </div>
    </div>
  );
}
