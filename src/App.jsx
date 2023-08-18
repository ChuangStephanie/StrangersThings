import "./App.css";
import AllPosts from "./Components/AllPosts";
import { Route, Routes } from "react-router-dom";
import SinglePost from "./Components/SinglePost";

function App() {
  return (
    <>
      <div className="container">
        <div id="mainbody">
          <Routes>
            <Route path="/" element={<AllPosts />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
