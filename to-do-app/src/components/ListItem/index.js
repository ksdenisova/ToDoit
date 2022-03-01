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
    this.props.item.completed = !this.props.item.completed;
    this.props.updateList();
  }

  deleteItem () {
    let removalItemId = this.props.item.id;
    let remainingItems = this.props.activeList.items.filter((item) => {
        return item.id != removalItemId});

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
    this.props.item.name = this.state.itemName;
    this.props.updateList();

    this.setImmutable();
  }
  
  render() {
    return (
      <div className="item">
        <Checkbox
          defaultChecked={this.props.item.completed}
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
          onChange={event => this.setItemNameHandler(event.target.value)}
          onBlur={this.updateItemNameHandler}>
        </input>
        <div className="icons">
          <EditIcon
            className="edit-icon"
            data-testid="editIcon"
            onClick={this.setImmutableHandler}
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
