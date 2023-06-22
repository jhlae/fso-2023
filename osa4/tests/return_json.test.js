const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogentry");
const api = supertest(app);
const initialBlogs = require("./_BLOGS");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs.multipleBloglistEntries);
});

const blogsEntriesCount = async () => {
  const blogEntries = await Blog.find({});
  return blogEntries.map((entry) => entry.toJSON());
};

describe("Check that the blog list includes some blogs and that field ID exists instead of _id.", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs have field id instead of mongo's default field _id", async () => {
    const res = await api.get("/api/blogs");
    const ids = res.body.map((blog) => blog.id);
    for (const id of ids) {
      expect(id).toBeDefined(); // https://jestjs.io/docs/expect#tobedefined
    }
  });

  describe("Test inserting a blog post.", () => {
    test("One can insert blog entries to bloglist via POST request.", async () => {
      const newTestBlogEntry = {
        title: "Test post",
        author: "Firstname Lastname",
        url: "https://www.example.com",
        likes: 33,
      };

      const blogsCountBeforeInsert = await blogsEntriesCount();

      await api
        .post("/api/blogs")
        .send(newTestBlogEntry)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsCountAfterInsert = await blogsEntriesCount();

      expect(blogsCountAfterInsert).toHaveLength(
        blogsCountBeforeInsert.length + 1
      );
    });
  });
});

describe("Test deleting a blog post.", () => {
  test("204 No content if deletion is successful.", async () => {
    const blogCountBeforeDeletion = await Blog.find({});
    const blogEntryToBeDeleted = blogCountBeforeDeletion[0];

    await api.delete(`/api/blogs/${blogEntryToBeDeleted.id}`).expect(204);

    const blogCountAfterDeletion = await Blog.find({});
    expect(blogCountAfterDeletion).toHaveLength(
      blogCountBeforeDeletion.length - 1
    );
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
