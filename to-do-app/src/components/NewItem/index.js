import React, { Component } from 'react';
import AddIcon from '@mui/icons-material/Add';
import './style.css';

class NewItem extends Component {
  constructor(props) {
    super(props);

    this.state ={
      item: ""
    }

    this.addItemHandler = this.addItem.bind(this);
  }
  
  addItem() {
    if (this.state.item == "") {
      return;
    }

    let newItem = {"toDoItem": this.state.item, "completed": false};
    let id = this.props.activeList.items.length;

    this.props.activeList.items[id] = newItem;
    this.props.saveActiveList(this.props.activeList);
  
    this.setState({item: ""});
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
          value={this.state.item}
          placeholder="Enter New To-Do Item"
          onChange={event => this.setState({item: event.target.value})}>
        </input>
      </div>
    );
  }
}

export default NewItem;