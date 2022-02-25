import React, { Component } from 'react';
import './style.css';
import { Checkbox } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: props.itemProperties.toDoItem,
      immutable: true
    }

    this.updateItemStatusHandler = this.updateItemStatus.bind(this);
    this.deleteItemHandler = this.deleteItem.bind(this);
    this.makeItemMutableHandler = this.makeItemMutable.bind(this);
    this.editItemHandler = this.editItem.bind(this);
  }
  
  updateItemStatus() {
    this.props.itemProperties.completed = !this.props.itemProperties.completed;
  }

  deleteItem () {
    let removalItem = this.props.itemProperties.toDoItem;
    let remainingItems = this.props.activeList.items.filter((item) => {
        return item.toDoItem != removalItem});

    this.props.activeList.items = remainingItems;
    this.props.saveActiveList(this.props.activeList);
  }

  makeItemMutable() {
    this.setState({ immutable: false });
  }

  editItem(name) {
    this.setState({ itemName: name });
    this.props.itemProperties.toDoItem = this.state.itemName;
    this.props.activeList.items = [this.props.itemProperties];
    this.props.updateList();
  }
  
  render() {
    return (
      <div className="item">
        <Checkbox
          defaultChecked={this.props.itemProperties.completed}
          onChange={this.updateItemStatusHandler}
          icon={<CheckBoxOutlineBlankOutlinedIcon />}
          checkedIcon={<CheckBoxOutlinedIcon />}
          color="default"
          disableRipple
        />
        <input
          className="item-text"
          type="text"
          value={this.state.itemName}
          disabled={this.state.immutable}
          onChange={event => this.editItemHandler(event.target.value)}>
        </input>
        <div className="icons">
          <EditIcon
            className="edit-icon"
            data-testid="editIcon"
            onClick={this.makeItemMutableHandler}
          />
          <DeleteIcon 
            className="delete-icon"
            data-testid="deleteIcon"
            onClick={this.deleteItemHandler}
          />
        </div>
      </div>
    );
  }
}

export default ListItem;
