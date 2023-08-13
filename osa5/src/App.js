import { useState, useEffect } from "react";
import Blog from "./components/Blog";

import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const [message, setMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("");

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleCreateBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog.title, newBlog.author, newBlog.url);
    setNewBlog({ title: "", author: "", url: "" });
  };

  const createBlog = async (title, author, url) => {
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
          {blogListing()}

          <div>
            <h2>Create new blog</h2>
            <form onSubmit={handleCreateBlog}>
              <div>
                title
                <input
                  name="title"
                  type="text"
                  value={newBlog.title}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                author
                <input
                  name="author"
                  type="text"
                  value={newBlog.author}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                url
                <input
                  name="url"
                  type="text"
                  value={newBlog.url}
                  onChange={handleInputChange}
                />
              </div>
              <button id="create-blog-btn" type="submit">
                create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
