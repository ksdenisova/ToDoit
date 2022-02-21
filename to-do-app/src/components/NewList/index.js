import React, { Component } from 'react';
import './style.css';
import AddIcon from '@mui/icons-material/Add';

class NewList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        inputValue:""
    }

    this.imageClickHandler = this.createNewList.bind(this)
  }
  
  createNewList () {
    if (this.state.inputValue == "") {
      return;
    }
    
    let newList = { "title": this.state.inputValue, "user": "Default User", "items": [] };

    this.props.createList(newList);
    this.props.getAllLists();
    this.setState({inputValue: ""});
  }
  
  render() {
    return (
        <div>
            <AddIcon className="add-icon" onClick={this.imageClickHandler} data-testid="addIcon"/>
            <input 
              className="new-list"
              type="text" 
              value= {this.state.inputValue} 
              onChange={event => this.setState({inputValue: event.target.value})}
              placeholder="Enter your new list">     
            </input>
        </div>
    );
  }
}

export default NewList;