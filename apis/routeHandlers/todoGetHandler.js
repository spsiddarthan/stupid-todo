
const TodoItem = require('../models/TodoItem.js');

//Get all todo items from the db.
module.exports = async (req, res) => {
	const todoItems = await TodoItem.find({})
	res.send({
    	items: todoItems
    });
};
