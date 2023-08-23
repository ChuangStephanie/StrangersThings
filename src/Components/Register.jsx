import { useState, useEffect } from "react";

const COHORT_NAME = "2305-FTB-ET-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Register({ setToken }) {
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password do not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Pasword.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password do not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: "",
            password: "",
          },
        }),
      });
      const result = await response.json();
      setToken(result.token);
      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <h2>Sign Up!</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={input.username}
            onChange={onInputChange}
            onBlur={validateInput}
          />
          {error.username && <span className="err">{error.username}</span>}
        </label>

        <label>
          Password:{" "}
          <input
            type="password"
            value={input.password}
            onChange={onInputChange}
            onBlur={validateInput}
          />
          {error.password && <span className="err">{error.password}</span>}
        </label>

        <label>
          Confirm Password:{""}
          <input
            type="password"
            value={input.confirmPassword}
            onChange={onInputChange}
            onBlur={validateInput}
          />
          {error.confirmPassword && (
            <span className="err">{error.confirmPassword}</span>
          )}
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
