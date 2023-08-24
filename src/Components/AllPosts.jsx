import { useState, useEffect } from "react";
import { fetchAllPosts } from "../API";
import { createSearchParams, useNavigate } from "react-router-dom";

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
    ? posts.filter((post) => post.title.toLowerCase().includes(searchParam))
    : posts;
  console.log(
    postsToDisplay.filter((post) =>
      post.title.toLowerCase().includes(searchParam)
    )
  );
  console.log(searchParam);
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
        <button className="newpost" onClick={() => navigate({
                  pathname: `/new-post`,
                  search: createSearchParams({
                    id: posts._id,
                    title: posts.title,
                    author: posts.author.username,
                    price: posts.price,
                    description: posts.description,
                    messages: posts.messages.content
                  }).toString(),
                })}>New Post</button>
      </div>

      {postsToDisplay.map((posts) => (
        <div key={posts._id} className="post">
          <h3>{posts.title}</h3>
          <h4>{posts.author.username}</h4>
          <h5>{posts.price}</h5>
          <div className="message">
            <button
              className="messagebutton"
              onClick={() =>
                navigate({
                  pathname: `/posts/${posts._id}/messages`,
                  search: createSearchParams({
                    id: posts._id,
                    title: posts.title,
                    author: posts.author.username,
                    price: posts.price,
                    description: posts.description,
                    messages: posts.messages.content
                  }).toString(),
                })
              }
            >
              Send Message
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
