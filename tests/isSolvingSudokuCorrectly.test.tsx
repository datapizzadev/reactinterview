/* eslint-disable no-undef */
import { fireEvent, render, screen, } from "@testing-library/react";
import { expect, test } from "vitest";
import userEvent from '@testing-library/user-event'
import React from "react";
import Grid from "../src/components/Grid/grid";
import { puzzle, solution } from "./setup";

test("Is solving sudoku correctly", async () => {
  // Arrange
  const { container } = render(<Grid />);
  const cells = container.getElementsByTagName("input");

  // Expecting grid to reflect input changes
  puzzle.split("").forEach((v, i) => {
    fireEvent.change(cells.item(i)!, { target: { value: v === "." ? "0" : v } });
    expect(cells.item(i)!.value).toBe(v === "." ? "" : v);
  });

  await userEvent.click(screen.getByText('Solve'));

  // Expecting grid to recieve and set solution correctly
  solution.split("").forEach((v, i) => {
    expect(cells.item(i)!.value).toBe(v);
  })

});

