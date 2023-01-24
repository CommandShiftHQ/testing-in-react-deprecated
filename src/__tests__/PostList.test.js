import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import PostList from "../components/PostList";

describe("PostList", () => {
  const validProps = {
    posts: [
      {
        id: 1,
        author: "test author",
        body: "test body",
        date: "test date",
        isPublished: true,
        tags: ["test tag1", "test tag2", "test tag3"],
        title: "test title",
       },
      {
        id: 2,
        author: "test author 2",
        body: "test body 2",
        date: "test date 2",
        isPublished: false,
        tags: ["test tag1-2", "test tag2-2", "test tag3-2"],
        title: "test title 2",
      },
    ],
  };


  test("Renders as expected", () => {
    const testRenderer = renderer
      .create(<PostList posts={validProps.posts} />)
      .toJSON();

    expect(testRenderer).toMatchSnapshot();
  });

  test("Last upvoted post is displayed when clicked", async () => {
    render(
      <PostList
        posts={validProps.posts}
      />
    );

    // Query for buttons and validate correct values
    const buttons = screen.getAllByRole("button")
    const firstPostUpvoteButton = buttons[0]
    const secondPostUpvoteButton = buttons[1]

    expect(firstPostUpvoteButton).toHaveValue(validProps.posts[0].title)
    expect(secondPostUpvoteButton).toHaveValue(validProps.posts[1].title)

    // Query for last upvoted text, validate not being displayed when mounted
    const lastUpvotedDisplay = screen.queryByText("Last upvoted post: ")

    expect(lastUpvotedDisplay).not.toBeInTheDocument()

    // Click first posts button, validated result is displayed
    fireEvent.click(firstPostUpvoteButton)
    const lastUpvotedDisplayed = await screen.findByText("Last upvoted post: test title")

    expect(lastUpvotedDisplayed).toBeInTheDocument()

    // Click button for first post and validate state update
    fireEvent.click(secondPostUpvoteButton)
    const lastUpvotedDisplayed2 = await screen.findByText("Last upvoted post: test title 2")

    expect(lastUpvotedDisplayed2).toBeInTheDocument()
  });
});