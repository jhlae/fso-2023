import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [message, setMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotificationType("error");
      setMessage("Wrong credentials!");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null); // set state user to null
  };

  const noUserFoundErrorMsg = () => {
    setNotificationType("error");
    setMessage("Error: User was not found and no likes updated.");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const createNewBlog = async (title, author, url) => {
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs(blogs.concat(blog));
      setNotificationType("notification");
      setMessage(`a new blog ${title} by ${author} added!`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setNotificationType("error");
      setMessage("error: " + exception.response.data.error);
    }
  };

  const updateBlogLikes = async (id, blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(id, blogToUpdate);
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      );
      setBlogs(newBlogs);
    } catch (exception) {
      setNotificationType("error");
      setMessage("Error: " + exception.response.data.error);
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      setUser(parsedUser);
      blogService.setToken(parsedUser.token);
    }
  }, []);

  return (
    <div>
      {message && (
        <Notification message={message} notificationType={notificationType} />
      )}

      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button id="logout-btn" onClick={handleLogout}>
            logout
          </button>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              username={user.username}
              updateBlogLikes={updateBlogLikes}
              noUserFoundErrorMsg={noUserFoundErrorMsg}
            />
          ))}

          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm createNewBlog={createNewBlog} />
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default App;
