import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchAllPosts } from "../API";

const COHORT_NAME = "2305-FTB-ET-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Message() {
  let { id } = useParams();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  let token = sessionStorage.getItem("token")  

  async function sendMessage(e) {
    e.preventDefault();
    
    try{
      const response =  await fetch(`${BASE_URL}/posts/${posts._id}/messages`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          message: {
            content: message
          }
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
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
      </div>
    </>
  );
}
