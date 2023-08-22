import { Routes, Route } from 'react-router-dom';
import './App.css';
import AllPosts from './Components/AllPosts';
import SinglePost from './Components/SinglePost'; // Import the SinglePost component
import DeletePost from './Components/DeletePost'; // Import the DeletePost component
import NavBar from './Components/NavBar';
import Authenticate from './Components/Login';

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
          <Route path="/post/:postId" element={<SinglePost />} />   {/* Add this route */}
          <Route path="/delete/:postId" element={<DeletePost />} /> {/* Add this route */}
        </Routes>
      </div>
    </>
  );
}

export default App;
