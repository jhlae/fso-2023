const listHelper = require("../utils/list_helper");
const { noBloglistEntries, multipleBloglistEntries } = require("./_BLOGS");

test("Dummy returns one.", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("Total likes:", () => {
  test("No blog entries, total like count is zero.", () => {
    const result = listHelper.totalLikes(noBloglistEntries);
    expect(result).toBe(0);
  });

  test("The bloglist includes multiple blog entries, expect total likes sum 36.", () => {
    const result = listHelper.totalLikes(multipleBloglistEntries);
    expect(result).toBe(36);
  });
});

describe("Favorite blog.", () => {
  test("No entries, except value false.", () => {
    const result = listHelper.favoriteBlog(noBloglistEntries);
    expect(result).toBe(false);
  });

  test("Multiple blog entries, check which entry has the most like count and expect the value to be as listed.", () => {
    const result = listHelper.favoriteBlog(multipleBloglistEntries);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});
