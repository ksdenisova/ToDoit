import ListItem from '../ListItem';
import NewItem from '../NewItem';
import React, { Component } from 'react';
import './style.css';

class ListView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let view;
    let title;

    if (this.props.activeList === undefined) {
      view = <div className='Logo-Container'> <img src="/8L.png" className="App-logo" alt="logo" /></div>;
    } else {
        title = this.props.activeList.title;

        const items = this.props.activeList.items.map(
        entry => <ListItem 
          key={entry.toDoItem} 
          activeList = {this.props.activeList}
          saveActiveList = {this.props.saveActiveList}
          itemProperties = {entry}>
        </ListItem>)
      
      view = <>
        {items}
        <NewItem activeList = {this.props.activeList} saveActiveList = {this.props.saveActiveList}/>
      </>
    }

    return (
        <div>
          <div>
            <h3 className="active-list-header">{title}</h3>
          </div>
          <div className="items">
            {view}
          </div>
        </div>
    );
  }
}

export default ListView;
