import React from 'react';
import NewList from '.';
import { render, screen } from "@testing-library/react"
import { shallow } from "enzyme";
import AddIcon from '@mui/icons-material/Add';

test("renders add list button icon", () => {
  render(<NewList />);

  const icon = screen.getByTestId("addIcon");

  expect(icon).toBeInTheDocument();
});

test("renders form for a new list", () => {
  render(<NewList />);

  const form = screen.getAllByRole("textbox");

  expect(form).toHaveLength(1);

  const textbox = screen.getByPlaceholderText("Enter your new list");

  expect(textbox).toBeInTheDocument();
});

test("adds a new item to the active list", () => {
  const createListSpy = jest.fn();
  const getAllListsSpy = jest.fn();

  const wrapper = shallow(<NewList createList={createListSpy} getAllLists={getAllListsSpy}/>);
  
  render(<NewList createList={createListSpy} getAllLists={getAllListsSpy}/>);

  const inputForm = wrapper.find("input");

  const testTitle = "New List";

  inputForm.simulate("change", {target: {value: testTitle}});

  expect(wrapper.find("input").get(0).props.value).toEqual(testTitle);

  const newList = {"title": testTitle, "user": "Default User", "items": []};

  wrapper.find(AddIcon).simulate("click");

  expect(wrapper.instance().props.createList).toHaveBeenCalledTimes(1);
  expect(wrapper.instance().props.createList).toHaveBeenCalledWith(newList);
  expect(wrapper.instance().props.getAllLists).toHaveBeenCalledTimes(1);
});
