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

    let id = this.props.activeList.items.length;
    let nextId = this.props.activeList.items[id - 1].id + 1;
    let newItem = {"id": nextId, "name": this.state.actionFormValue, "completed": false};

    this.props.activeList.items[id] = newItem;
    this.props.saveActiveList(this.props.activeList);
    this.props.updateList();
    
    this.setState({actionFormValue: ""});
  }

  render() {
    return (
      <div>
        <AddIcon className="add-item-icon" onClick={this.addItemHandler} data-testid="addIcon"/>
          <input 
            className="new-item-input" type="text" 
                  value={this.state.actionFormValue} placeholder='Enter New To-Do Item'
            onChange = {event => this.setState({actionFormValue: event.target.value})}
            data-testid="newItem">
          </input>
        <div className = "List-Item-Button"/>
      </div>
    );
  }
}

export default NewItem;