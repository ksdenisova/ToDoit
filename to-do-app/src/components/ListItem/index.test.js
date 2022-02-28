import React from 'react';
import ListItem from '.';
import { render, screen, fireEvent } from "@testing-library/react"
import { shallow } from "enzyme";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

test("renders items from to-do list", () => {
  const testItem = {"toDoItem": "First Item", "completed": false}

  render(<ListItem itemProperties = {testItem}/>);

  const item = screen.getByDisplayValue(/First Item/i);

  expect(item).toBeInTheDocument();
});

test("renders delete button icon", () => {
  const testItem = {"toDoItem": "First Item", "completed": false}

  render(<ListItem itemProperties = {testItem}/>);

  const icon = screen.getByTestId("deleteIcon");

  expect(icon).toBeInTheDocument();
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

  wrapper.find(DeleteIcon).simulate("click");

  const expected = {"id": 1, "title": "Dummy Title", "items": [{"completed": false, "toDoItem": "First Item"}]}
  
  expect(wrapper.instance().props.activeList).toEqual(expected);
});


test("renders edit button icon", () => {
  const testItem = {"toDoItem": "First Item", "completed": false}

  render(<ListItem itemProperties = {testItem}/>);

  const icon = screen.getByTestId("editIcon");

  expect(icon).toBeInTheDocument();
});

test("item is disabled for editing by default", () => {
  const testItem = {"toDoItem": "First Item", "completed": false}

  render(<ListItem itemProperties = {testItem}/>);

  const item = screen.getByRole("textbox");

  expect(item).toBeDisabled();
});

test("item is editable when click EditIcon", () => {
  const testItem = {"toDoItem": "First Item", "completed": false}

  const wrapper = shallow(<ListItem itemProperties={testItem}/>);

  const icon = wrapper.find(EditIcon);
  icon.simulate('click');

  const item = wrapper.find("input");

  expect(item.prop('disabled')).toEqual(false);
});

test("changes an item for active list", () => {
  const testItem = {"toDoItem": "First Item", "completed": false};
  const testList = { "id": 1, "title": "Dummy Title", "items": 
                      [ testItem ] }

  const wrapper = shallow(<ListItem activeList={testList} itemProperties={testItem} updateList={() => null}/>);

  const icon = wrapper.find(EditIcon);
  icon.simulate('click');
  
  const item = wrapper.find("input");
  item.simulate("change", {target: {value: "Edited Item"}})

  expect(wrapper.find("input").get(0).props.value).toEqual("Edited Item");

  item.simulate('blur');
  const expected = {"id": 1, "items": [{"completed": false, "toDoItem": "Edited Item"}], "title": "Dummy Title"}
  
  expect(wrapper.instance().props.activeList).toStrictEqual(expected);
});
