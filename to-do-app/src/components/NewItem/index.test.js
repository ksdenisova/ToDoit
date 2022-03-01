import React from 'react';
import NewItem from '.';
import { render, screen, fireEvent, userEvent } from "@testing-library/react"
import { shallow, mount } from "enzyme";
import AddIcon from '@mui/icons-material/Add';

test("renders add button icon", () => {
  render(<NewItem />);

  const icon = screen.getByTestId("addIcon");

  expect(icon).toBeInTheDocument();
});

test("renders form for a new item", () => {
  render(<NewItem />);

  const form = screen.getAllByRole("textbox");

  expect(form).toHaveLength(1);

  const textbox = screen.getByPlaceholderText("Enter New To-Do Item");

  expect(textbox).toBeInTheDocument();
});

test("adds a new item to the active list", () => {
  const testList = { "id": 1, "title": "Dummy Title", "items": 
                      [ {"id": 1, "name": "First Item", "completed": false} ] }

  const wrapper = shallow(<NewItem activeList={testList} changeActiveList={() => null} updateList={() => null}/>);
  
  const inputForm = wrapper.find("input");

  inputForm.simulate("change", {target: {value: "New Item"}})

  expect(wrapper.find("input").get(0).props.value).toEqual("New Item");

  wrapper.find(AddIcon).simulate("click");

  const expected = {"id": 1, "items": [{"id": 1, "name": "First Item", "completed": false}, {"id": 2, "name": "New Item", "completed": false,}], "title": "Dummy Title"}
  
  expect(wrapper.instance().props.activeList).toStrictEqual(expected);
});
