import ListItem from './ListItem';
import ActionForm from './ActionForm';
import React, { Component } from 'react';

class ListView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let view;

    if (this.props.activeList === undefined) {
      view = <div className='Logo-Container'> <img src="/8L.png" className="App-logo" alt="logo" /></div>;
    } else {
        const items = this.props.activeList.items.map(
        entry => <ListItem 
          key={entry.toDoItem} 
          activeList = {this.props.activeList}
          saveActiveList = {this.props.saveActiveList}
          itemProperties = {entry}>
        </ListItem>)
      
      view = <>
        <ActionForm activeList = {this.props.activeList} saveActiveList = {this.props.saveActiveList}/>
        {items}
      </>
    }

    return (
        <div className="List-View">
          {view}
        </div>
    );
  }
}

export default ListView;