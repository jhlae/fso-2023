const blogsRouter = require("express").Router();
const Blog = require("../models/blogentry");

blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogsRouter.post("/", (req, res, next) => {
  const body = req.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((savedEntry) => {
      res.status(201).json(savedEntry);
    })
    .catch((error) => next(error));
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
