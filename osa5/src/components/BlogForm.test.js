import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import BlogForm from "./BlogForm";

test("test blog creation with the correct details given", async () => {
  const blogMockHandler = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createNewBlog={blogMockHandler} />);

  const titleElem = container.querySelector("input[name='title']");
  const authorElem = container.querySelector("input[name='author']");
  const urlElem = container.querySelector("input[name='url']");
  const addBlogButton = screen.getByText("create");

  await user.type(titleElem, "title");
  await user.type(authorElem, "author");
  await user.type(urlElem, "https://google.com");
  await user.click(addBlogButton);

  console.log(blogMockHandler.mock.calls);

  expect(blogMockHandler.mock.calls).toHaveLength(1);

  expect(blogMockHandler.mock.calls[0][0]).toBe("title");
  expect(blogMockHandler.mock.calls[0][1]).toBe("author");
  expect(blogMockHandler.mock.calls[0][2]).toBe("https://google.com");
});
