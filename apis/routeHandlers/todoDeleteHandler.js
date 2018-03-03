
const TodoItem = require('../models/TodoItem.js');
const config = require('../../config.js');
const  socketIOClient= require('socket.io-client');
const socket = socketIOClient(config.socketBaseUrl);

//Get all todo items from the db.
module.exports = async (req, res) => {
	const result = await TodoItem.remove({_id : req.params.id});
	if (result.n === 1)
		socket.emit('item removed', req.params.id); 
	res.send({});
};
