// import packages
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {value: '', endpoint: "http://localhost:4001", items: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('item added', this.state.value) 
    this.setState({value: ''});//, items: this.state.items});
  }

  setItem = (item) => {
    if (this.state.items.indexOf(item) === -1) {
      this.state.items.push(item);
      this.setState({items: this.state.items});
    }  
  }
 
  render() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('item added', (item) => {
      console.log(item);
          console.log('length of items is ', this.state.items.length);
      this.setItem(item);
    })


    const divToRender= this.state.items.map((item) => {
      return (<li>{item}</li>)
    });
    const parentDiv =  <ul>{divToRender}</ul>;


    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Item:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" disabled={this.state.value===''}/>
          </form>
          {parentDiv}
      </div>
    )
  }  
}

export default App