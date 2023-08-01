import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogListing = () =>
    blogs.map((blog) => <Blog key={blog.id} blog={blog} />);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null); // set state user to null
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      setUser(parsedUser);
    }
  }, []);

  return (
    <div>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button id="logout-btn" onClick={handleLogout}>
            logout
          </button>
          {blogListing()}
        </div>
      )}
    </div>
  );
};

export default App;
