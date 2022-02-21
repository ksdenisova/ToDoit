import React, { Component } from 'react';

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
        <div className="List-Item-Container">
            <img src="/remove-item.png" 
            className="Action-Button"
            onClick={this.handleDelete}></img>
            <div className = "To-Do-Space">{this.props.itemProperties.toDoItem}</div>
            <div className = "List-Item-Button">
                <input 
                    type="checkbox" className='List-Checkbox' 
                    defaultChecked={this.props.itemProperties.completed}
                    onChange={this.handleClick}>
                </input>
            </div>
        </div>
    );
  }
}

export default ListItem;