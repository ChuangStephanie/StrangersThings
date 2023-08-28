import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import AllPosts from "./Components/AllPosts";
import DeletePost from "./Components/DeletePost"; // Import the DeletePost component
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NewPost from "./Components/NewPost";
import Profile from "./Components/Profile";
import Message from "./Components/Message";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <div className="container">
        <NavBar />
      </div>
      <div className="mainbody">
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/Login" element={<Login token={token} />} />
          <Route path="/posts/:postId/messages" element={<Message />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/new-post" element={<NewPost />} />{" "}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
