const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
	//_id: mongoose.Schema.Types.ObjectId,
	id: {type: Number, required: true},
	name: {type: String, required: true},
	childrenIds: {type: [Number], required: true}
});

module.exports = mongoose.model('Category', categorySchema);