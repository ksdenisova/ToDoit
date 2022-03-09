import React from 'react';
import ListItem from '.';
import { render, screen, fireEvent } from "@testing-library/react"
import { shallow } from "enzyme";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

test("renders items from to-do list", () => {
  const testItem = {"id": 1, "name": "First Item", "completed": false}

  render(<ListItem item={testItem}/>);

  const item = screen.getByDisplayValue(/First Item/i);

  expect(item).toBeInTheDocument();
});

test("renders delete button icon", () => {
  const testItem = {"id": 1, "name": "First Item", "completed": false}

  render(<ListItem item={testItem}/>);

  const icon = screen.getByTestId("deleteIcon");

  expect(icon).toBeInTheDocument();
});

test("checkbox is rendered once", () => {
  const testItem = {"id": 1, "name": "First Item", "completed": false}

  render(<ListItem item={testItem}/>);

  const checkbox = screen.getAllByRole("checkbox");

  expect(checkbox).toHaveLength(1);
});

test("checkbox is marked if item is done", () => {
  const testItem = {"id": 1, "name": "First Item", "completed": true}

  render(<ListItem item={testItem}/>);

  const checkbox = screen.getByRole("checkbox");

  expect(checkbox.checked).toBeTruthy();
});

test("checkbox completed switches states after click", () => {
  const testItem = {"id": 1, "name": "First Item", "completed": true}

  render(<ListItem item={testItem} updateList={() => null} changeActiveList={(list) => list}/>);

  const checkbox = screen.getByRole("checkbox");

  fireEvent.change(checkbox, { target: {checked: false}})
  
  expect(checkbox.checked).toBeFalsy();
});

test("changes the status of active list", () => {
  const testItem = {"id": 1, "name": "First Item", "completed": false}

  const wrapper = shallow(<ListItem item={testItem} updateList={() => null} changeActiveList={(list) => list}/>);
  
  render(<ListItem item={testItem} updateList={() => null} changeActiveList={(list) => list}/>);

  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(checkbox);

  expect(wrapper.instance().props.item).toStrictEqual({"id": 1, "name": "First Item", "completed": true});
});

test("removes an item from active list", () => {
  const testList = { "id": 1, "title": "Dummy Title", "items": 
                      [ {"id": 1, "name": "First Item", "completed": false},
                        {"id": 2, "name": "Should Be Deleted", "completed": false} ] }

  const itemToDelete = {"id": 2, "name": "Should Be Deleted", "completed": false}

  const wrapper = shallow(<ListItem activeList={testList}
                                    changeActiveList={(list) => list}
                                    item={itemToDelete}
                                    updateList={() => null}/>);
  
  wrapper.find(DeleteIcon).simulate("click");

  const expected = {"id": 1, "title": "Dummy Title", "items": [{"id": 1, "name": "First Item", "completed": false}]}
  
  expect(wrapper.instance().props.activeList).toEqual(expected);
});

test("renders edit button icon", () => {
  const testItem = {"id": 1, "name": "First Item", "completed": false}

  render(<ListItem item={testItem}/>);

  const icon = screen.getByTestId("editIcon");

  expect(icon).toBeInTheDocument();
});

test("item is readonly for editing by default", () => {
  const testItem = {"id": 1, "name": "First Item", "completed": false}

  const wrapper = shallow(<ListItem item={testItem}/>);

  const item = wrapper.find("input");

  expect(item.prop('readOnly')).toEqual(true);
});

test("item is editable when click EditIcon", () => {
  const testItem = {"id": 1, "name": "First Item", "completed": false}

  const wrapper = shallow(<ListItem item={testItem}/>);

  const icon = wrapper.find(EditIcon);
  icon.simulate('click');

  const item = wrapper.find("input");

  expect(item.prop('readOnly')).toEqual(false);
});

test("changes an item for active list", () => {
  const testItem = {"id": 1, "name": "First Item", "completed": false};
  const testList = { "id": 1, "title": "Dummy Title", "items": 
                      [ testItem ] }

  const wrapper = shallow(<ListItem activeList={testList} item={testItem} updateList={() => null} changeActiveList={() => null}/>);

  const icon = wrapper.find(EditIcon);
  icon.simulate('click');
  
  const item = wrapper.find("input");
  item.simulate("change", {target: {value: "Edited Item"}})

  expect(wrapper.find("input").get(0).props.value).toEqual("Edited Item");

  item.simulate('blur');
  const expected = {"id": 1, "items": [{"id": 1, "name": "Edited Item", "completed": false}], "title": "Dummy Title"}
  
  expect(wrapper.instance().props.activeList).toStrictEqual(expected);
});

test("uses 'complited-item' style selector if item is completed", () => {
  const testItem = {"id": 1, "name": "First Item", "completed": true};

  const wrapper = shallow(<ListItem item={testItem}/>);

  const item = wrapper.find("input");

  expect(item.hasClass('item-text completed-item')).toBeTruthy();
});

test("uses 'hidden' style selector for icons if item is completed", () => {
  const testItem = {"id": 1, "name": "First Item", "completed": true};

  const wrapper = shallow(<ListItem item={testItem}/>);

  const editIcon = wrapper.find(EditIcon);
  const deleteIcon = wrapper.find(DeleteIcon);

  expect(editIcon.hasClass('hidden')).toBeTruthy();
  expect(deleteIcon.hasClass('hidden')).toBeTruthy();
});

test("doesn't remove completed item", () => {
  const testItem = {"id": 1, "name": "Should Not Be Deleted", "completed": true}
  const testList = { "id": 1, "title": "Dummy Title", "items": 
                      [ testItem ] }

  const wrapper = shallow(<ListItem activeList={testList}
                                    item={testItem}
                                    updateList={() => null}/>);
  
  wrapper.find(DeleteIcon).simulate("click");
  
  expect(wrapper.instance().props.activeList).toEqual(testList);
});

test("strikeout item and mark as completed on click", () => {
  const testItem = {"id": 1, "name": "First Item", "completed": false}

  const wrapper = shallow(<ListItem item={testItem} updateList={() => null} changeActiveList={() => null}/>);

  render(<ListItem item={testItem} updateList={() => null} changeActiveList={() => null}/>);

  const item = wrapper.find("input");
  item.simulate("click");

  wrapper.instance().forceUpdate()
  const updatedItem = wrapper.find("input");

  expect(wrapper.instance().props.item.completed).toBeTruthy();
  expect(updatedItem.hasClass('item-text completed-item')).toBeTruthy();
});
