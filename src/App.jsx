import { Routes, Route } from 'react-router-dom';
import './App.css';
import AllPosts from './Components/AllPosts';
import SinglePost from './Components/SinglePost'; // Import the SinglePost component
import DeletePost from './Components/DeletePost'; // Import the DeletePost component
import NavBar from './Components/NavBar';
import Authenticate from './Components/Login';
import Login from './Components/Login';
import Profile from './Components/Profile';

function App() {
  return (
    <>
      <div className="container">
        <NavBar />
      </div>
      <div className="mainbody">
        <Routes>
        <Route path="/" element={<Authenticate />} />
          <Route path="/AllPosts" element={<AllPosts />} />
          <Route path="/post/:postId" element={<SinglePost />} />
          <Route path="/delete/:postId" element={<DeletePost />} />
          <Route path="/new-post" element={<NewPost />} /> {/* Add this route */}
{/* 
          <Route path="/" element={<AllPosts />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/post/:postId" element={<SinglePost />} />   {/* Add this route */}
          {/* <Route path="/delete/:postId" element={<DeletePost />} /> Add this route */}
        </Routes>
      </div>
    </>
  );
}

export default App;
