import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const COHORT_NAME = "2305-FTB-ET-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;


export default function NewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [posts] = useSearchParams();
  let token = sessionStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price,
            willDeliver
          }
        })
      });

      const result = await response.json();
      console.log(result);

      // Redirect to the AllPosts page after successful post creation
      if (response.ok) {
        navigate("/");
      } else {
        window.alert("Invalid token, please sign up or log in");
        navigate("/Login");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="new-post">
      <h2>Create New Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Will Deliver:
          <input type="checkbox" checked={willDeliver} onChange={(e) => setWillDeliver(e.target.checked)} />
        </label>
        <button>Create Post</button>
      </form>
    </div>
  );
}
