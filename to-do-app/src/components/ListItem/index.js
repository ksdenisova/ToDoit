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
      itemName: props.item.name,
      immutable: true
    }

    this.updateItemStatusHandler = this.updateItemStatus.bind(this);
    this.updateItemNameHandler = this.updateItemName.bind(this);
    this.deleteItemHandler = this.deleteItem.bind(this);
    this.setImmutableHandler = this.setImmutable.bind(this);
    this.setItemNameHandler = this.setItemName.bind(this);
  }
  
  updateItemStatus() {
    if (!this.state.immutable) {
      return;
    }

    this.props.item.completed = !this.props.item.completed;
    this.props.changeActiveList(this.props.activeList);
    this.props.updateList();
  }

  deleteItem() {
    if (this.props.item.completed) {
      return;
    }

    let removalItemId = this.props.item.id;
    let remainingItems = this.props.activeList.items.filter((item) => {
        return item.id !== removalItemId});

    this.props.activeList.items = remainingItems;
    this.props.changeActiveList(this.props.activeList);
    this.props.updateList();
  }

  setImmutable() {
    this.setState({ immutable: !this.state.immutable });
  }

  setItemName(name) {
    this.setState({ itemName: name });
  }

  updateItemName() {
    // if (!this.state.immutable) {
    //   return;
    // }
    
    this.props.item.name = this.state.itemName;
    // this.props.changeActiveList(this.props.activeList);
    this.props.updateList();

    this.setImmutable();
  }
  
  render() {
    return (
      <div className="item">
        <Checkbox
          checked={this.props.item.completed}
          onChange={this.updateItemStatusHandler}
          icon={<CheckBoxOutlineBlankOutlinedIcon />}
          checkedIcon={<CheckBoxOutlinedIcon />}
          color="default"
          disableRipple
          data-testid="checkBox"
        />
        <input
          className={this.props.item.completed ? "item-text completed-item" : "item-text"}
          type="text"
          value={this.state.itemName}
          readOnly={this.state.immutable}
          onChange={event => this.setItemNameHandler(event.target.value)}
          onBlur={this.updateItemNameHandler}
          onClick={this.updateItemStatusHandler}>
        </input>
        <div className="icons">
          <EditIcon
            className={this.props.item.completed ?  "hidden" :  "edit-icon"}
            data-testid="editIcon"
            onClick={this.setImmutableHandler}
          />
          <DeleteIcon 
            className={this.props.item.completed ?  "hidden" :  "delete-icon"}
            data-testid="deleteIcon"
            onClick={this.deleteItemHandler}
          />
        </div>
      </div>
    );
  }
}

export default ListItem;
