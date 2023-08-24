import { useState } from "react";
import {
  useParams,
  useSearchParams,
} from "react-router-dom";
import DeletePost from "./DeletePost";


const COHORT_NAME = "2305-FTB-ET-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Message() {
  const [posts] = useSearchParams();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  let token = sessionStorage.getItem("token");
  console.log(posts.get("messages"));

  async function sendMessage(e) {
    e.preventDefault();
    if (token !== null) {
      try {
        const response = await fetch(
          `${BASE_URL}/posts/${posts.get("id")}/messages`,
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
  

  return (
    <>
      <div key={posts.get("id")} className="post">
        <h2>{posts.get("title")}</h2>
        <h4>{posts.get("author")}</h4>
        <h5>{posts.get("price")}</h5>
        <p>{posts.get("description")}</p>
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
          <p>{posts.get("messages")}</p>
        </div>
      </div>
      <div className="deletebutton">
        <button>Delete Post</button>
      </div>
    </>
  );
}
