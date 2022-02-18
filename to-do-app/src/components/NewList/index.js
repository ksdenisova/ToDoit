import React, { Component } from 'react';
import './style.css';

class NewList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        inputValue:""
    }

    this.imageClickHandler = this.createNewList.bind(this)
  }
  
  createNewList () {
    if (this.state.inputValue == "") {
      return;
    }
    
    let newList = { "title": this.state.inputValue, "user": "Default User", "items": [] };

    this.props.createList(newList);
    this.props.getAllLists();
    this.setState({inputValue: ""});
  }
  
  render() {
    return (
        <div className="list-titles">
            <img className="List-Image" src="./add-list.png" onClick={this.imageClickHandler}/>
            <span> 
              <input 
                className="new-list" type="text" 
                value= {this.state.inputValue} 
                onChange={event => this.setState({inputValue: event.target.value})}
                placeholder='Enter New List'>     
              </input>
            </span>
        </div>
    );
  }
}

export default NewList;