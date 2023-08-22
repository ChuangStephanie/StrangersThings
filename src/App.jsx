import { Routes, Route } from 'react-router-dom';
import './App.css';
import AllPosts from './Components/AllPosts';
import SinglePost from './Components/SinglePost'; // Import the SinglePost component
import DeletePost from './Components/DeletePost'; // Import the DeletePost component
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <>
      <div className="container">
        <NavBar />
      </div>
      <div className="mainbody">
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/post/:postId" element={<SinglePost />} />   {/* Add this route */}
          <Route path="/delete/:postId" element={<DeletePost />} /> {/* Add this route */}
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
