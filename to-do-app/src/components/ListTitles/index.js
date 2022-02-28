import NewList from '../NewList';
import '../../ToDoApp.css';
import './style.css';
import React, { Component } from 'react';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

class ListTitles extends Component {
  getActiveList(title) {
    const activeList = this.props.toDoLists.filter((list) => {
      return list.title === title});

    return activeList[0];
  }

  getTitles() {
    return this.props.toDoLists.map(list => list.title);
  }

  render() {
    let lists = <ul></ul>;
    
    if (this.props.isLoaded) {
      let titles = this.getTitles();

      lists = titles.map(
        title => 
          <ul key={title}>
            <li
              className={this.props.activeList && title === this.props.activeList.title ? "active-list" : "inactive-list"} 
              onClick={() => this.props.saveActiveList(this.getActiveList(title))}>
              <CircleOutlinedIcon className="icon"/>
              {title}
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
              createList={this.props.createList}
              getAllLists={this.props.getAllLists}
            />
          </div>
      </div>);
  }
}

export default ListTitles;
