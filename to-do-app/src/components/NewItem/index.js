import React, { Component } from 'react';
import AddIcon from '@mui/icons-material/Add';
import './style.css';

class NewItem extends Component {
  constructor(props) {
    super(props);

    this.state ={
      actionFormValue: ""
    }

    this.addItemHandler = this.addItem.bind(this);
  }
  
  addItem() {
    if (this.state.actionFormValue == "") {
      return;
    }

    let newItem = {"toDoItem": this.state.actionFormValue, "completed": false};
    let id = this.props.activeList.items.length;

    this.props.activeList.items[id] = newItem;
    this.props.saveActiveList(this.props.activeList);
  
    this.setState({actionFormValue: ""});
  }

  render() {
    return (
      <div>
        <AddIcon 
          className="add-item-icon"
          onClick={this.addItemHandler}
          data-testid="addIcon"
        />
        <input 
          className="new-item-input" type="text" 
          value={this.state.actionFormValue}
          placeholder="Enter New To-Do Item"
          onChange={event => this.setState({actionFormValue: event.target.value})}>
        </input>
      </div>
    );
  }
}

export default NewItem;