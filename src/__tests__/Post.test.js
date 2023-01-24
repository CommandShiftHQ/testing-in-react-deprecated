import React from "react";
import { render } from "@testing-library/react";
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
});