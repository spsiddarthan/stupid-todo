// import packages
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import config from './config.js';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {value: '', endpoint: "http://localhost:4001", items: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount = async () => {
    const response = await fetch(config.apiBaseUrl + '/todos', {
      method: 'get',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json'
      }
    });
    const res = await  response.json();
    this.setState({items: res.items});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('item added', this.state.value) 

    await fetch(config.apiBaseUrl + '/todo', {
      method: 'post',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.state.value})
    });
    this.setState({value: ''});//, items: this.state.items});
  }

  async handleDelete(item) {
    await fetch(config.apiBaseUrl + '/todo/' + item._id , {
      method: 'delete',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json'
      }
    });
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
      return (
        <div>
          <li>{item.name}</li>
            <button onClick={(e) => {e.preventDefault(); this.handleDelete(item)}}>Delete</button>
        </div>  
      );
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