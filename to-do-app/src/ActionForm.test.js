import React from 'react';
import ActionForm from './ActionForm';
import { render, screen, fireEvent, userEvent } from "@testing-library/react"
import { shallow, mount } from "enzyme";

test("renders add button image", () => {
  render(<ActionForm />);

  const image = screen.getByRole("img");

  expect(image).toHaveAttribute("src", "/plus.png");
});

test("renders form for a new item", () => {
  render(<ActionForm />);

  const form = screen.getAllByRole("textbox");

  expect(form).toHaveLength(1);

  const textbox = screen.getByPlaceholderText("New To-Do Item");

  expect(textbox).toBeInTheDocument();
});

test("adds a new item to the active list", () => {
  const filteredJson = { "id": 1, "title": "Dummy Title", "items": 
                      [ {"toDoItem": "First Item", "completed": false} ] }

  const wrapper = shallow(<ActionForm activeList={filteredJson} saveActiveList={() => null}/>);
  
  render(<ActionForm activeList={filteredJson} saveActiveList={() => null}/>);

  const inputForm = wrapper.find("input");

  inputForm.simulate("change", {target: {value: "New Item"}})

  expect(wrapper.find("input").get(0).props.value).toEqual("New Item");

  wrapper.find("img").simulate("click");

  const expected = {"id": 1, "items": [{"completed": false, "toDoItem": "First Item"}, {"completed": false, "toDoItem": "New Item"}], "title": "Dummy Title"}
  
  expect(wrapper.instance().props.activeList).toStrictEqual(expected);
});
