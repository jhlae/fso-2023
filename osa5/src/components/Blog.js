import { useState } from "react";

const Blog = ({ blog, username }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 4,
    paddingLeft: 4,
    paddingBottom: 4,
    border: "dashed",
    borderWidth: 1,
    marginBottom: 4,
    marginTop: 4,
  };

  return (
    <div className="blog-details" style={blogStyle}>
      <div>
        <span className="blog-details__title">{blog.title} -</span>
        <span className="blog-details__author">{blog.author}</span>{" "}
        <button id="view-details-btn" onClick={toggleVisibility}>
          {!visible ? "show" : "hide"}
        </button>
      </div>

      {visible && (
        <div className="blog-details__extra">
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes} <button id="like-btn">like</button>
            {""}
          </div>
          <div>{username}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
