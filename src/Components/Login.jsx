import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COHORT_NAME = "2305-FTB-ET-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  async function handleClick(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      });
      const token = await response.json();
      setSuccessMessage(token.data.message);
      setUserData(token.data);
      console.log(token);
      return token;
    } catch (error) {
      setError(error.message);
    }
  }

    function logIn() {
        if (userData === null) {
            return;
        } else {
            sessionStorage.setItem("token", userData.token);
            sessionStorage.setItem("username", username);
            return;
        }
    }

    logIn();

  return (
    <>
      <h2>Login</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userData && <p>Welcome, {username}!</p>}
      <form onSubmit={handleClick}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
      <button onClick={() => navigate("/register")}>New user? Sign up!</button>
    </>
  );
}
