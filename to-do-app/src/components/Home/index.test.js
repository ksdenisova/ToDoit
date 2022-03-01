import Home from '.';
import React from 'react';
import { shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react"

beforeEach(() => {
  const testLists = 
   [
      { "id": 1, "title": "First Test Title", "items": [
        {"id": 1, "name": "First Item", "completed": false},
        {"id": 2, "name": "Second Item", "completed": false}
       ]},
      { "id": 2, "title": "Second Test Title", "items": [
        {"id": 1, "name": "First Item", "completed": false},
        {"id": 2, "name": "Second item", "completed": false}
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

test("renders ToDo lists titles", async () => {
  await act(async () => {
    render(<Home />);
  });

  const lists = screen.getAllByRole('list');

  expect(lists).toHaveLength(2);
  expect(lists[0]).toHaveTextContent(/First Test Title/i);
  expect(lists[1]).toHaveTextContent(/Second Test Title/i);
  
  global.fetch.mockRestore();
});

test("changeActiveList changes activeList", async () => {
  const wrapper = shallow(<Home />);

  const testList = { "id": 1, "title": "Dummy Title", "items": 
        [ {"id": 1, "name": "First Item", "completed": false} ] }

  wrapper.instance().changeActiveList(testList);

  expect(wrapper.state().activeList.title).toBe("Dummy Title");
})

test("renders delete list button", () => {
  render(<Home />);

  const deleteButton = screen.getByTestId("deleteButton");

  expect(deleteButton).toBeInTheDocument();
  expect(deleteButton).toHaveTextContent("Delete List");
})

test("delete button is disabled if there is no active lists", () => {
  render(<Home />);

  const deleteButton = screen.getByTestId("deleteButton");

  expect(deleteButton).toBeDisabled();
})

test("delete button is enabled if list is active", async () => {
  const wrapper = shallow(<Home />);

  await act(async () => {
    render(<Home />);
  });

  wrapper.setState({ activeList: "some list" })
  const button = wrapper.find({ "data-testid": "deleteButton" });

  expect(button.prop('disabled')).toEqual(false);
})

test("removes active list when 'Delete List' button has been clicked", async () => {
  const spy = jest.spyOn(Home.prototype, "deleteActiveList");
  const wrapper = shallow(<Home/>);

  await act(async () => {
    render(<Home />);
  });

  wrapper.setState({ activeList: "some list" })

  const button = wrapper.find({ "data-testid": "deleteButton" });

  button.simulate('click');

  expect(Home.prototype.deleteActiveList).toHaveBeenCalledTimes(1);
})
