import React, { render, screen } from "@testing-library/react";
import App from "../components/App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText("Intro to React II");
  expect(linkElement).toBeInTheDocument();
});
