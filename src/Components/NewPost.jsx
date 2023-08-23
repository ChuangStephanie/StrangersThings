import React, { useState } from "react";
import { BASE_URL, TOKEN_STRING_HERE } from "../API"; // Make sure to import BASE_URL and TOKEN_STRING_HERE
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN_STRING_HERE}`
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
        navigate("/AllPosts");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="new-post">
      <h2>Create New Post</h2>
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
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
