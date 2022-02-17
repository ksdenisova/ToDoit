import React from 'react';
import ListItem from './ListItem';
import { render, screen, fireEvent } from "@testing-library/react"
import { shallow } from "enzyme";

test("renders items from to-do list", () => {
  const testItem = {"toDoItem": "First Item", "completed": false}

  render(<ListItem itemProperties = {testItem}/>);

  expect(screen.getByText(/First Item/i)).toBeInTheDocument();
});

test("renders remove button image", () => {
  const testItem = {"toDoItem": "First Item", "completed": false}

  render(<ListItem itemProperties = {testItem}/>);

  const image = screen.getByRole("img");

  expect(image).toHaveAttribute("src", "/remove-item.png");
});

test("checkbox is rendered once", () => {
  const testItem = {"toDoItem": "First Item", "completed": false}

  render(<ListItem itemProperties = {testItem}/>);

  const checkbox = screen.getAllByRole("checkbox");

  expect(checkbox).toHaveLength(1);
});

test("checkbox is marked if item is done", () => {
  const testItem = {"toDoItem": "First Item", "completed": true}

  render(<ListItem itemProperties = {testItem}/>);

  const checkbox = screen.getByRole("checkbox");

  expect(checkbox.checked).toBeTruthy();
});

test("checkbox completed switches states after click", () => {
  const testItem = {"toDoItem": "First Item", "completed": true}

  render(<ListItem itemProperties = {testItem}/>);

  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(checkbox);

  expect(checkbox.checked).toBeFalsy();
});

test("changes the status of active list", () => {
  const testItem = {"toDoItem": "First Item", "completed": false}

  const wrapper = shallow(<ListItem itemProperties={testItem}/>);
  
  render(<ListItem itemProperties={testItem}/>);

  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(checkbox);

  expect(wrapper.instance().props.itemProperties).toStrictEqual({"toDoItem": "First Item", "completed": true});
});

test("removes an item from active list", () => {
  const testList = { "id": 1, "title": "Dummy Title", "items": 
                      [ {"toDoItem": "First Item", "completed": false},
                        {"toDoItem": "Should Be Deleted", "completed": false} ] }

  const itemToDelete = {"toDoItem": "Should Be Deleted", "completed": false}

  const wrapper = shallow(<ListItem activeList={testList} saveActiveList={(list) => list} itemProperties={itemToDelete}/>);
  
  render(<ListItem activeList={testList} saveActiveList={(list) => list} itemProperties={itemToDelete}/>);

  wrapper.find("img").simulate("click");

  const expected = {"id": 1, "title": "Dummy Title", "items": [{"completed": false, "toDoItem": "First Item"}]}
  
  expect(wrapper.instance().props.activeList).toEqual(expected);
});
