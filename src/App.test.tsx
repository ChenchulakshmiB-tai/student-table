import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import TableComponent from "./App";

describe("test case for tableComponet", () => {
  test("cases for checking component mounting", () => {
    render(<TableComponent />);
    const element = screen.getByText(/name/i);
    expect(element).toBeInTheDocument();
  });

  test("renders the table with initial data", () => {
    render(<TableComponent />);
    const name = screen.getAllByPlaceholderText("name")[0];
    const age = screen.getAllByPlaceholderText("age")[0];
    const job = screen.getAllByPlaceholderText("job")[0];
    const score = screen.getAllByPlaceholderText("score")[0];

    expect(name).toBeInTheDocument();
    expect(age).toBeInTheDocument();
    expect(job).toBeInTheDocument();
    expect(score).toBeInTheDocument();
  });

  test("allows adding a new row", () => {
    render(<TableComponent />);
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    const rows = screen.getAllByPlaceholderText("name");
    expect(rows.length).toBe(2);
  });

  test("allows to delete a row", () => {
    render(<TableComponent />);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(screen.queryByPlaceholderText("name")).not.toBeInTheDocument();
  });

  test("checking the edit button", () => {
    render(<TableComponent />);

    const editButton = screen.getByText("Edit");
    const name = screen.getByPlaceholderText("name");
    fireEvent.click(editButton);
    fireEvent.change(name, { target: { value: "Test cases" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(name).toHaveValue("Test cases");
  });
  test("closes the filter form", () => {
    render(<TableComponent />);

    fireEvent.click(screen.getByText("Filter"));
    expect(screen.getByText("Check")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByText("Check")).not.toBeInTheDocument();
  });
});
