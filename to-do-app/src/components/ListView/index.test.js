import React from 'react';
import ListView from '.';
import { render, screen } from "@testing-library/react"

test("renders logo if active list is empty", () => {
  render(<ListView/>);

  const image = screen.getByRole("img");

  expect(image).toHaveAttribute("src", "/8L.png");
});

test("renders appropriate number of list items", () => {
  const testList = {"title": "First Test Title", "items": [
    {"id": 1, "name": "First Item", "completed": false},
    {"id": 2, "name": "Second Item", "completed": false},
    {"id": 3, "name": "Third", "completed": false}]}

  render(<ListView activeList={testList}/>);
  
  const items = screen.getAllByRole("checkbox");

  expect(items).toHaveLength(3);
});

test("renders items from to-do list", () => {
  const testList = {"title": "First Test Title", "items": [
    {"id": 1, "name": "First Item", "completed": false},
    {"id": 2, "name": "Second Item", "completed": false}]}

  render(<ListView activeList={testList}/>);
  
  const newItem = screen.getByTestId("newItem");

  expect(newItem).toBeInTheDocument();
  expect(screen.getByDisplayValue(/First Item/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/Second Item/i)).toBeInTheDocument();
});

test("renders progress bar", () => {
  const testList = {"title": "First Test Title", "items": []}

  render(<ListView activeList={testList}/>);

  const progressBar = screen.getByRole("progressbar");

  expect(progressBar).toBeInTheDocument();
});

test("the progress bar is filled based on the number of items completed", () => {
  const testList = {"title": "First Test Title", "items": [
    {"id": 1, "name": "First Item", "completed": true},
    {"id": 2, "name": "Second Item", "completed": false},
    {"id": 3, "name": "Third Item", "completed": true},
    {"id": 4, "name": "Forth Item", "completed": true}]}

  render(<ListView activeList={testList}/>);

  const progressBar = screen.getByRole("progressbar");

  expect(progressBar).toHaveAttribute("value", "3");
  expect(progressBar).toHaveAttribute("max", "4");
});

test("the progress bar is not filled if there is no items in active list", () => {
  const testList = {"title": "First Test Title", "items": []}

  render(<ListView activeList={testList}/>);

  const progressBar = screen.getByRole("progressbar");

  expect(progressBar).toHaveAttribute("value", "0");
  expect(progressBar).toHaveAttribute("max", "0");
});

test("the progress bar has a text label 'completed/total'", () => {
  const testList = {"title": "First Test Title", "items": [
    {"id": 1, "name": "First Item", "completed": true},
    {"id": 2, "name": "Second Item", "completed": false},
    {"id": 3, "name": "Third Item", "completed": true},
    {"id": 4, "name": "Forth Item", "completed": true}]}

  render(<ListView activeList={testList}/>);

  const label = screen.getByTestId("label");

  expect(label).toHaveTextContent("3/4");
});
