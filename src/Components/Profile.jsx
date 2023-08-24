import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Profile() {

  const [activeUser, setActiveUser] = useState(null);
  const navigate = useNavigate();

  function logOut() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    navigate("/login");
    return;
  }

  return (
    <section id="profile">
      {sessionStorage.getItem("username") ? (
        <h2>Welcome {sessionStorage.getItem("username")}</h2>
      ) : (
        <h2>Log in or Register as new user</h2>
      )}
      <div id="profile-messages-cont">
        {activeUser?.data.messages.length < 1 && <h4>No messages</h4>}
        {activeUser?.data.messages.length > 0 && (
          <>
            <div>
              <h2 className="sub-titling">Messages sent by you: </h2>
              {activeUser?.data.messages
                .filter(
                  (message) =>
                    message.fromUser.username === activeUser?.data.username
                )
                .map((message) => {
                  return (
                    <div key={message._id} className="post-cont">
                      <h3>(Sent by you)</h3>
                      <p className="postdelivered">
                        Message: {message.content}
                      </p>
                      <p className="postdelivered">
                        Post: {message.post.title}
                      </p>
                      <Link
                        className="postlink"
                        to={`/posts/${message.post._id}`}
                      >
                        Message Again
                      </Link>
                    </div>
                  );
                })}
            </div>
          </>
        )}
        <button onClick={logOut}>{sessionStorage.getItem("username") ? "Log Out" : "Login/Register" }</button>
      </div>
    </section>
  );
}
