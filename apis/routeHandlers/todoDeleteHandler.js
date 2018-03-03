
const TodoItem = require('../models/TodoItem.js');

//Get all todo items from the db.
module.exports = async (req, res) => {
	await TodoItem.remove({_id : req.params.id});
	res.send({
    	
    });
};
