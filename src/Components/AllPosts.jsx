import { useState, useEffect } from "react";
import { fetchAllPosts } from "../API";
import { useNavigate } from "react-router-dom";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllPosts() {
      const APIData = await fetchAllPosts();
      if (APIData.success) {
        setPosts(APIData.data.posts);
      } else {
        setError(APIData.error);
      }
    }
    getAllPosts();
  }, []);

  const postsToDisplay = searchParam
    ? posts.filter((posts) => {
        posts.title.toLowerCase().includes(searchParam);
      })
    : posts;

  return (
    <>
      <div className="searchbar">
        <label>
          Search
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearchParam(e.target.value)}
          />
        </label>
      </div>

      {postsToDisplay.map((posts) => (
        <div key={posts._id} className="post">
            <h3>{posts.title}</h3>
            <h4>{posts.author.username}</h4>
            <h5>{posts.price}</h5>
            <div className="message">
                <button className="messagebutton" onClick={() => navigate(`/${posts.id}`)}>
                    Send Message
                </button>
            </div>
        </div>
      ))}
    </>
  );
}
