import React, { Component } from 'react';

class ActionForm extends Component {
  constructor(props) {
    super(props);

    this.state ={
      actionFormValue: ""
    }

    this.handlePlus = this.cilckAction.bind(this);
  }
  
  cilckAction() {
    if (this.state.actionFormValue == "") {
      return;
    }

    let newItem = {"toDoItem": this.state.actionFormValue, "completed": false};
    let id = this.props.activeList.items.length;

    this.props.activeList.items[id] = newItem;
    this.props.saveActiveList(this.props.activeList);
  
    this.setState({actionFormValue: ""});
  }

  render() {
    return (
        <div className="List-Item-Container">
            <img src="/add-item.png" 
              className="Action-Button" 
              onClick={this.handlePlus}>
            </img>
            <div className = "To-Do-Space">
              <form className='Action-Form'>
                <input 
                  className="Action-Input" type="text" 
                  value={this.state.actionFormValue} placeholder='Enter New To-Do Item'
                  onChange = {event => this.setState({actionFormValue: event.target.value})}>
                </input>
              </form>
            </div>
            <div className = "List-Item-Button"/>
        </div>
    );
  }
}

export default ActionForm;