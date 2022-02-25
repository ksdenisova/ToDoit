import ListTitles from '.';
import React from 'react';
import { shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react"

test("does not renders list tab if lists has not loaded", () => {
  render(<ListTitles />);

  expect(screen.getByRole('list')).toHaveTextContent("");
});

test("changes active list on click", () => {
  const testLists = 
   [
      { "id": 1, "title": "First Test Title"},
      { "id": 2, "title": "Second Test Title"}
    ]
  
  const saveActiveListMock = jest.fn();
  const wrapper = shallow(<ListTitles isLoaded={true} toDoLists={testLists} saveActiveList={saveActiveListMock}/>);

  wrapper.find('li').first().simulate('click');
 
  expect(saveActiveListMock).toHaveBeenCalledTimes(1);
})

test("uses 'inactive-list' style selector if list is not active", () => {
  const testList = 
   [
      { "id": 1, "title": "First Test Title"}
    ]
  
  const wrapper = shallow(<ListTitles isLoaded={true} toDoLists={testList} saveActiveList={ () => null }/>);

  const list = wrapper.find('li');

  expect(list.hasClass('inactive-list')).toBeTruthy();
})

test("uses 'active-list' style selector if list is active", () => {
  const testList = 
   [
      { "id": 1, "title": "First Test Title"}
    ]

  const wrapper = shallow(<ListTitles isLoaded={true} toDoLists={testList} saveActiveList={ () => null } activeList={testList[0]}/>);

  const list = wrapper.find('li');

  expect(list.hasClass('active-list')).toBeTruthy();
})

test("uses different style selectors for active and inactive lists", () => {
  const testLists = 
   [
      { "id": 1, "title": "First Test Title"},
      { "id": 2, "title": "Second Test Title"}
    ]

  const wrapper = shallow(<ListTitles isLoaded={true} toDoLists={testLists} saveActiveList={ () => null } activeList={testLists[0]}/>);

  const activeList = wrapper.find('li').at(0);
  expect(activeList.hasClass('active-list')).toBeTruthy();

  const inactiveList = wrapper.find('li').at(1);
  expect(inactiveList.hasClass('inactive-list')).toBeTruthy();
})
