import React, { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "../components/App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Testing in React/);
  expect(linkElement).toBeInTheDocument();
});

test("renders as expected", () => {
  const testRenderer = renderer
    .create(
      <App />
    )
    .toJSON();

  expect(testRenderer).toMatchSnapshot();
});