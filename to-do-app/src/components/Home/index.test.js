import Home from '.';
import React from 'react';
import { shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react"

beforeEach(() => {
  const testLists = 
   [
      { "id": 1, "title": "First Test Title", "items": [
        {"toDoItem": "First Item", "completed": false},
        {"toDoItem": "Second Item", "completed": false}
       ]},
      { "id": 2, "title": "Second Test Title", "items": [
        {"toDoItem": "First Item", "completed": false},
        {"toDoItem": "Second item", "completed": false}
       ]}
    ]

    jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(testLists)
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
}); 

test("renders ToDo lists titles in reverse order", async () => {
  await act(async () => {
    render(<Home />);
  });

  const lists = screen.getAllByRole('list');

  expect(lists).toHaveLength(2);
  expect(lists[0]).toHaveTextContent(/Second Test Title/i);
  expect(lists[1]).toHaveTextContent(/First Test Title/i);
  
  global.fetch.mockRestore();
});

test("changeActiveList changes activeList", async () => {
  const wrapper = shallow(<Home />);

  const testList = { "id": 1, "title": "Dummy Title", "items": 
        [ {"toDoItem": "First Item", "completed": false} ] }

  wrapper.instance().changeActiveList(testList);

  expect(wrapper.state().activeList.title).toBe("Dummy Title");
})

test("renders submit button", () => {
  render(<Home />);

  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Submit");
})

test("submit button is disabled if there is no active lists", () => {
  render(<Home />);

  const button = screen.getByRole("button");

  expect(button).toBeDisabled();
})

test("submit button is enabled if list is active", async () => {
  const wrapper = shallow(<Home />);

  await act(async () => {
    render(<Home />);
  });

  wrapper.setState({ activeList: "some list" })

  expect(wrapper.find('button').prop('disabled')).toEqual(false);
})

test("calls the putActiveList integration test", async () => {
  const spy = jest.spyOn(Home.prototype, "putActiveList");
  const wrapper = shallow(<Home/>);

  await act(async () => {
    render(<Home />);
  });

  expect(wrapper.find('button').prop('disabled')).toEqual(true);

  wrapper.setState({ activeList: "some list" })

  expect(wrapper.find('button').prop('disabled')).toEqual(false);

  wrapper.find("button").simulate("click");

  expect(Home.prototype.putActiveList).toHaveBeenCalledTimes(1);
})
