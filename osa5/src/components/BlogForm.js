import { useState } from "react";

const BlogForm = ({ createNewBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleBlogCreation = (e) => {
    e.preventDefault();
    createNewBlog(newBlog.title, newBlog.author, newBlog.url);
    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleBlogCreation}>
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
  );
};

export default BlogForm;
