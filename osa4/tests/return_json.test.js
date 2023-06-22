const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogentry");

const api = supertest(app);

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
      const blogsEntriesCount = async () => {
        const blogEntries = await Blog.find({});
        return blogEntries.map((entry) => entry.toJSON());
      };

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

afterAll(async () => {
  await mongoose.connection.close();
});
