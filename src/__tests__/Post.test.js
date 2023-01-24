import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Post from "../components/Post";

describe("Post", () => {
  const validProps = {
    postData: {
      author: "test author",
      body: "test body",
      date: "test date",
      isPublished: true,
      tags: ["test tag1", "test tag2", "test tag3"],
      title: "test title",
    },
    handleUpvote: jest.fn(),
  };

  test("renders as expected", () => {
    const testRenderer = renderer
      .create(
        <Post
          postData={validProps.postData}
          handleUpvote={validProps.handleUpvote}
        />
      )
      .toJSON();

    expect(testRenderer).toMatchSnapshot();
  });

  test("Post author renders correctly", () => {
    render(
      <Post
        postData={validProps.postData}
        handleUpvote={validProps.handleUpvote}
      />
    );

    expect(screen.getByText("Author: test author")).toBeInTheDocument();
  });

  test("Renders single button with the correct text", () => {
    render(
      <Post
        postData={validProps.postData}
        handleUpvote={validProps.handleUpvote}
      />
    );

    const buttons = screen.getAllByRole("button")

    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveTextContent(/Upvote this/)
  });

  test("Tags list renders correct number of items", () => {
    render(
      <Post
        postData={validProps.postData}
        handleUpvote={validProps.handleUpvote}
      />
    );
    const listItems = screen.getAllByRole("listitem");

    expect(listItems.length).toBe(3);
  });

  test("Upvote button calls handler with correct arguments", () => {
    render(
      <Post
        postData={validProps.postData}
        handleUpvote={validProps.handleUpvote}
      />
    );

    fireEvent.click(screen.getByText(/Upvote this/));

    expect(validProps.handleUpvote).toBeCalledTimes(1);
    expect(validProps.handleUpvote).toHaveBeenCalledWith(validProps.postData.title);
  });
});