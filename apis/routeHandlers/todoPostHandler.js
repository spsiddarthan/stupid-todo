
const TodoItem = require('../models/TodoItem.js');

//End point to post an item
module.exports = async (req, res) => {
	const { name } = req.body;
	const todoItem = new TodoItem({name});
	const item = await todoItem.save();
	res.send({
    	item: item
    });
};
