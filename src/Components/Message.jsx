import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchSinglePost } from "../API";

const COHORT_NAME = "2305-FTB-ET-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Message() {
  const [postId] = useSearchParams();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  let token = sessionStorage.getItem("token");
  const [post, setPost] = useState([]);

  useEffect(() => {
    console.log("hello");
    async function getPost() {
      const p = await fetchSinglePost(postId.get("id"));
      setPost(p[0]);
      console.log(p[0]);
    }
    getPost();
  }, []);

  async function sendMessage(e) {
    e.preventDefault();

    if (token !== null) {
      try {
        const response = await fetch(
          `${BASE_URL}/posts/${postId.get("id")}/messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              message: {
                content: message,
              },
            }),
          }
        );
        const result = await response.json();
        console.log(result);
        return result;
      } catch (error) {
        setError(error.message);
      }
    } else {
      return window.alert("Must be logged in to send message!");
    }
  }

  async function DeletePost(e) {
    e.preventDefault();

    if (token !== null) {
      try {
        const response = await fetch(`${BASE_URL}/posts/${postId.get("id")}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        window.alert("Post has been deleted.");
        console.log(result);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError(error.message);
      return window.alert("You are not logged in.");
    }
  }

  return (
    <>
      <div key={post._id} className="post">
        <h2>{post.title}</h2>
        <h4>{postId.get('author')}</h4>
        <h5>{post.price}</h5>
        <p>{post.description}</p>
      </div>
      <h2>Send a Message</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="message">
        <form onSubmit={sendMessage}>
          <label>Message: </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
        <div className="responses">
          <h2>Responses</h2>
          {/* <p>{post.messages}</p> */}
        </div>
      </div>
      <div className="deletebutton">
        <button onClick={DeletePost}>Delete Post</button>
      </div>
    </>
  );
}
