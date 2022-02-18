import NewList from '../NewList';
import '../../ToDoApp.css';
import './style.css';
import React, { Component } from 'react';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

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
          <ul key={entry}>
            <li onClick={() => this.props.saveActiveList(this.filterLists(entry))}>
              <CircleOutlinedIcon className="icon"/>
              <img className= "List-Image" src="./remove-list.png" onClick={this.props.deleteActiveList}/>
              <span>{entry}</span>
            </li>
          </ul>
        );
    }

    return (
      <div>
        <h2 className="my-lists-header">my lists</h2>
          <div className="list-titles">
            {lists}
            <NewList 
              createList = {this.props.createList}
              getAllLists = {this.props.getAllLists}
            />
          </div>
      </div>);
  }
}

export default ListTitles;
