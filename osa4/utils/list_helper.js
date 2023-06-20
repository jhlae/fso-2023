const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, post) => sum + post.likes, 0);
};

const favoriteBlog = (blogs) => {
  // Bail out early.
  if (blogs.length === 0) {
    return false;
  }

  const favoriteBlogByLikeCount = blogs.reduce((prev, cur) => {
    return prev.likes > cur.likes ? prev : cur;
  });

  return {
    title: favoriteBlogByLikeCount.title,
    author: favoriteBlogByLikeCount.author,
    likes: favoriteBlogByLikeCount.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
