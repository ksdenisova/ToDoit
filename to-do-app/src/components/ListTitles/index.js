import NewList from '../ListView/NewList';
import '../../ToDoApp.css';
import './style.css';
import React, { Component } from 'react';

class ListTitles extends Component {
  filterLists(title) {
    const activeList = this.props.toDoLists.filter((list) => {
      return list.title === title});

    return activeList[0];
  }

  getTitles() {
    return this.props.toDoLists.map(entry => entry.title);
  }

  render() {
    var lists = <ul></ul>;
    
    if (this.props.isLoaded) {
      let titles = this.getTitles();

      lists = titles.map(
        entry => 
          <li key={entry}>
            <img className= "List-Image" src="./remove-list.png" onClick={this.props.deleteActiveList}/>
            <ul onClick={() => 
              this.props.saveActiveList(this.filterLists(entry))}>{entry}</ul>
          </li>
        );
    }

    return (
      <div>
        <h2 className="my-lists-header">my lists</h2>
          <div className="list-titles">
            {lists}
            <NewList 
              createList = {this.createNewListHandler}
              getAllLists = {this.getAllListsHandler}
            />
          </div>
      </div>);
  }
}

export default ListTitles;
