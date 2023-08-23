import { Routes, Route } from "react-router-dom";
import "./App.css";
import AllPosts from "./Components/AllPosts";
import SinglePost from "./Components/SinglePost";
import DeletePost from "./Components/DeletePost";
import NewPost from "./Components/NewPost"; // Import the NewPost component
import NavBar from "./Components/NavBar";
import Authenticate from "./Components/Login";
import Login from "./Components/Login";
import Profile from "./Components/Profile";

function App() {
  return (
    <>
      <div className="container">
        <NavBar />
      </div>
      <div className="mainbody">
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/post/:postId" element={<SinglePost />} />{" "}
          {/* Add this route */}
          <Route path="/delete/:postId" element={<DeletePost />} />{" "}
          {/* Add this route */}
          <Route path="/new-post" element={<NewPost />} />{" "}
          {/* Add this route */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
