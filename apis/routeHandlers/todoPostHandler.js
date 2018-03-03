
const TodoItem = require('../models/TodoItem.js');
const  socketIOClient= require('socket.io-client');
const config = require('../../config.js');
const socket = socketIOClient(config.socketBaseUrl);
//End point to post an item
module.exports = async (req, res) => {
	const { name } = req.body;
	const todoItem = new TodoItem({name});
	const item = await todoItem.save();
    socket.emit('item added', item); 
	res.send({
    	item: item
	});
	
};
