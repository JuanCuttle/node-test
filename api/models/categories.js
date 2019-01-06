const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
	//_id: mongoose.Schema.Types.ObjectId,
	id: Number,
	name: String,
	childrenIds: [Number]
});

module.exports = mongoose.model('Category', categorySchema);