const blogsRouter = require("express").Router();
const Blog = require("../models/blogentry");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFromHeader = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;

  const decodedToken = jwt.verify(getTokenFromHeader(req), process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  }).populate("user", { username: user.username, name: user.name });

  const savedEntry = await blog.save();
  user.blogs = user.blogs.concat({
    url: body.url,
    title: body.title,
    author: body.author,
    id: savedEntry._id,
  });

  await user.save();

  res.status(201).json(savedEntry.toJSON());
});

blogsRouter.delete("/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  if (blog) {
    await Blog.deleteOne({ _id: blogId });
    res.sendStatus(204).end();
  } else {
    res.sendStatus(404).end();
  }
});

module.exports = blogsRouter;
