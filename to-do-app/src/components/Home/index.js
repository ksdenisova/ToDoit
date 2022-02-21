import ListView from '../ListView';
import ListTitles from '../ListTitles';
import '../../ToDoApp.css';
import './style.css';
import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoLists: [],
      isLoaded: false
    }

    this.submitHandler = this.putActiveList.bind(this);
    this.saveActiveListHander = this.changeActiveList.bind(this);
    this.createNewListHandler = this.postNewList.bind(this);
    this.getAllListsHandler = this.getAllLists.bind(this);
    this.deleteListHandler = this.deleteActiveList.bind(this);
  }
  
  filterLists(title) {
    const activeList = this.state.toDoLists.filter((list) => {
      return list.title === title});

    return activeList[0];
  }

  changeActiveList(list) {
    this.setState({activeList: list});
  }

  putActiveList() {
    let list = this.state.activeList;
    const url = `http://localhost:3001/lists/${list.id}`;

    return fetch(url, {method: "PUT", headers: new Headers({'content-type': 'application/json'}), body: JSON.stringify(list)});
  }

  postNewList(list) {
    const url = `http://localhost:3001/lists/`;

    return fetch(url, {method: "POST", headers: new Headers({'content-type': 'application/json'}), body: JSON.stringify(list)});
  }

  deleteActiveList() {
    this.deleteList();
    this.changeActiveList(undefined);
    this.setState({ isLoaded: false })
    this.getAllLists();
  }

  deleteList() {
    if (this.state.activeList === undefined) {
      return;
    }

    let list = this.state.activeList;
    const url = `http://localhost:3001/lists/${list.id}`;

    return fetch(url, {method: "DELETE", headers: new Headers({'content-type': 'application/json'}), body: JSON.stringify(list)});
  }

  getAllLists() {
    fetch("http://localhost:3001/lists/")
    .then(response => response.json())
    .then(json => json.sort((x,y) => y.id - x.id))
    .then(lists => {
      this.setState({
        toDoLists: lists,
        isLoaded: true
      })
    })
  }

  componentDidMount() {
    this.getAllLists();
  }

  render() {
    let isDisabled;
   
    if (!this.state.activeList) {
      isDisabled = true;
    } else {
      isDisabled = false;
    }

    return (
      <div className="main">
        <h1 className="header-box">to doit</h1>
        <div className="list-box">
          <ListTitles 
            isLoaded = {this.state.isLoaded}
            toDoLists = {this.state.toDoLists}
            saveActiveList = {this.saveActiveListHander}
            deleteActiveList = {this.deleteListHandler}
            createList = {this.createNewListHandler}
            getAllLists = {this.getAllListsHandler}
          />
        </div>
        <div className='item-box'>
          <ListView
            activeList = {this.state.activeList}
            saveActiveList = {this.saveActiveListHander}
          />
        </div>
        <button className='Submit-Button button-box' disabled={isDisabled} onClick={this.submitHandler}>Submit</button>
      </div>);
  }
}

export default Home;
