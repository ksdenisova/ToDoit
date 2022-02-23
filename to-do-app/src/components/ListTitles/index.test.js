import ListTitles from '.';
import React from 'react';
import { shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react"

test("does not renders list tab if lists has not loaded", () => {
  render(<ListTitles />);

  expect(screen.getByRole('list')).toHaveTextContent("");
});

test("changes active list on click", async () => {
  const testLists = 
   [
      { "id": 1, "title": "First Test Title"},
      { "id": 2, "title": "Second Test Title"}
    ]
  
    const saveActiveListMock = jest.fn();
    const wrapper = shallow(<ListTitles isLoaded={true} toDoLists={testLists} saveActiveList={saveActiveListMock}/>);

    await act(async () => {
      render(<ListTitles isLoaded={true} toDoLists={testLists} saveActiveList={saveActiveListMock}/>);
    });

  wrapper.find('li').first().simulate('click');
 
  expect(saveActiveListMock).toHaveBeenCalledTimes(1);
})
