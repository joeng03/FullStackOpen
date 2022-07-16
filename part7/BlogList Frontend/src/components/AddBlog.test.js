import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddBlog from "./AddBlog";
describe("<AddBlog/>", () => {
  test("<AddBlog/> updates parent state and calls onSubmit", async () => {
    const handleAddBlog = jest.fn();
    render(<AddBlog handleAddBlog={handleAddBlog} />);
    const user = userEvent.setup();
    const inputs = screen.getAllByRole("textbox");
    const createBtn = screen.getByText("Create");
    await user.type(inputs[0], "Testing Title");
    await user.type(inputs[1], "Testing Author");
    await user.type(inputs[2], "Testing URL");
    await user.click(createBtn);
    expect(handleAddBlog.mock.calls).toHaveLength(1);
    console.log(handleAddBlog.mock.calls);
    expect(handleAddBlog.mock.calls[0][0]).toEqual({
      title: "Testing Title",
      author: "Testing Author",
      url: "Testing URL",
    });
  });
});

beforeEach(() => {});
