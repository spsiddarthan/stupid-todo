// import packages
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import _ from "lodash";
import config from './config.js';
import './App.css';
const socket = socketIOClient(config.socketBaseUrl);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {value: '', endpoint: config.socketBaseUrl, items: []};

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

  async handleSubmit() {
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

  removeItem = (itemId) => {
    this.state.items = _.filter(this.state.items,
      (item) => item._id !== itemId
    );  
    
    this.setState({items: this.state.items});
  }
 
  render() {
    socket.on('item added', (item) => {
      this.setItem(item);
    })

    socket.on('item removed', (item) => {
      this.removeItem(item);
    })

    const divToRender= this.state.items.map((item) => {
      return (
         <li>
            <input type="checkbox" onClick={(e) => {e.preventDefault(); this.handleDelete(item)}}/>
            <label>{item.name}</label>
         </li> 
      );
    });

    return (
      <div>
          <form onSubmit={this.handleSubmit} className='form'>
              <label>
                <input type="text" value={this.state.value} onChange={this.handleChange} placeholder='Add more todos!' />
              </label>
              <input type="submit" value="Add" disabled={this.state.value===''}/>
          </form>
          <div className="wrap">
            <div className="header"><span>Todo List</span>
            </div>
            <div className="wrap-list">
                <ol className="list">
                  {divToRender}
                </ol>
            </div>
          </div>
      </div>       
    )
  }  
}

export default App