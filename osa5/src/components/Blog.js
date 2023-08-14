import { useState } from "react";

const Blog = ({
  blog,
  username,
  updateBlogLikes,
  noUserFoundErrorMsg,
  deleteBlogEntry,
}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleClickLikeBtn = () => {
    const newLikes = blog.likes + 1; // New like count to be applied to a blog post

    if (blog.user) {
      // For the example list of blog entries, there are no user object, check that it exists.
      // If not, notify user pressing the like button has no effect.
      const blogToAddLikes = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: newLikes,
        user: blog.user.id,
      };
      updateBlogLikes(blog.id, blogToAddLikes);
    } else {
      noUserFoundErrorMsg();
    }
  };

  const handleClickDeleteEntry = () => {
    if (window.confirm(`Remove blog titled ${blog.title} by ${blog.author}?`)) {
      try {
        deleteBlogEntry(blog.id);
      } catch (exception) {
        console.log(exception);
      }
    }
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
            Likes: {blog.likes}{" "}
            <button id="like-btn" onClick={handleClickLikeBtn}>
              like
            </button>
            {""}
          </div>
          <div>{username}</div>
          <button id="delete-btn" onClick={handleClickDeleteEntry}>
            delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
