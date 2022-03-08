import ListItem from '../ListItem';
import NewItem from '../NewItem';
import React, { Component } from 'react';
import './style.css';

class ListView extends Component {
  render() {
    let view;
    let title;
    let progressMaxValue = this.props.activeList ? this.props.activeList.items.length : 0;
    let progressValue = this.props.activeList ? this.props.activeList.items.filter(i => i.completed).length : 0;

    if (this.props.activeList === undefined) {
      view = <div className='Logo-Container'> <img src="/8L.png" className="App-logo" alt="logo" /></div>;
    } else {
        title = this.props.activeList.title;

        const items = this.props.activeList.items.map(
        item => <ListItem 
          key={item.name}
          activeList={this.props.activeList}
          changeActiveList={this.props.changeActiveList}
          item={item}
          updateList={this.props.updateList}>
        </ListItem>)
      
      view = <>
        {items}
        <NewItem 
          activeList={this.props.activeList}
          changeActiveList={this.props.changeActiveList}
          updateList={this.props.updateList}
        />
      </>
    }

    return (
      <div>
        <div className="active-list-box">
          <h3 className="active-list-header">{title}</h3>
          <div className="progress-box">
            <progress
              max={progressMaxValue}
              value={progressValue}>
            </progress>
            <label
              data-testid="label">
              {progressValue + "/" + progressMaxValue}
            </label>
          </div>
        </div>
        <div className="items">
          {view}
        </div>
      </div>
    );
  }
}

export default ListView;
