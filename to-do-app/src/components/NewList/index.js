import React, { Component } from 'react';
import './style.css';
import AddIcon from '@mui/icons-material/Add';

class NewList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title:""
    }

    this.createListHandler = this.createNewList.bind(this);
    this.enterPressHandler = this.enterPress.bind(this);
  }

  enterPress(event) {
    if (event.key === "Enter") {
      this.createNewList();
    }
  }
  
  createNewList() {
    if (this.state.title === "") {
      return;
    }
    
    let newList = { "title": this.state.title, "user": "Default User", "items": [] };

    this.props.createList(newList);
    this.props.getAllLists();
    this.setState({title: ""});
  }
  
  render() {
    return (
      <div>
        <AddIcon
          className="add-icon"
          onClick={this.createListHandler}
          data-testid="addIcon"
        />
        <input 
          className="new-list"
          type="text" 
          value={this.state.title} 
          onChange={event => this.setState({title: event.target.value})}
          onKeyPress={this.enterPressHandler}
          placeholder="Enter your new list">
        </input>
      </div>
    );
  }
}

export default NewList;