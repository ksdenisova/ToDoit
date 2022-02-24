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

    this.handleClick = this.updateItemStatus.bind(this);
    this.handleDelete = this.removeListItem.bind(this);
  }
  
  updateItemStatus() {
    this.props.itemProperties.completed = !this.props.itemProperties.completed;
  }

  removeListItem () {
    let removalItem = this.props.itemProperties.toDoItem;
    let remainingItems = this.props.activeList.items.filter((item) => {
        return item.toDoItem != removalItem});

    this.props.activeList.items = remainingItems;
    this.props.saveActiveList(this.props.activeList);
  }
  
  render() {
    return (
        <div className="item">
          <Checkbox
            defaultChecked={this.props.itemProperties.completed}
            onChange={this.handleClick}
            icon={<CheckBoxOutlineBlankOutlinedIcon />}
            checkedIcon={<CheckBoxOutlinedIcon />}
            color="default"
            disableRipple
            />
          <div className="item-text">{this.props.itemProperties.toDoItem}</div>
          <div className="icons">
            <EditIcon
              className="edit-icon"
              data-testid="editIcon"
            />
            <DeleteIcon 
              className="delete-icon"
              data-testid="deleteIcon"
              onClick={this.handleDelete}
            />
          </div>
        </div>
    );
  }
}

export default ListItem;
