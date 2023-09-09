import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";

let component;
const mockHandler = jest.fn();

const blog = {
  title: "Blog post title",
  author: "Mr. Mongo",
  likes: 0,
  user: {
    username: "username",
    name: "name",
  },
};

beforeEach(() => {
  component = render(
    <Blog key={blog.id} blog={blog} updateBlogLikes={mockHandler} />
  );
});

test("renders title", () => {
  expect(
    component.container.querySelector(".blog-details__title")
  ).toHaveTextContent("Blog post title");
});

test("blog details are visible after clicking the additional info button", async () => {
  const user = userEvent.setup();

  const button = component.container.querySelector("button");
  await user.click(button);
  //screen.debug();

  const closeButton = screen.getByText("hide");
  await user.click(closeButton);

  const extraInfoForBlogs = component.container.querySelector(
    ".blog-details__extra"
  );
  expect(extraInfoForBlogs).toBeInTheDocument;
});

test("like button hit twice, event handler is also called two times", async () => {
  const user = userEvent.setup();
  const button = component.container.querySelector("button");
  await user.click(button);

  const likeButton = component.container.querySelector("#like-btn");
  await user.click(likeButton);
  await user.click(likeButton);
  // screen.debug();
  expect(mockHandler.mock.calls).toHaveLength(2);
});
