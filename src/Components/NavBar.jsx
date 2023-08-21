import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div id="navbar">
      <Link to="/">Home</Link>
      <Link to="/AllPosts">Posts</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}
