const express = require('express');
const Category = require('../models/categories')
const mongoose = require('mongoose');

const router = express.Router(); // Router which will register routes

const categories = [{
	id: 1,
	name: 'one',
	childrenIds: []
}, {
	id: 2,
	name: 'two',
	childrenIds: []
}];

router.get('/', (req, res, next) => { // GET requests: URL (after coming here, so /categories/ 
	//res.status(200).json(categories) //'Handling GET requests to /categories'
	Category.find().exec()
	.then(docs => {
		console.log(docs);
		res.status(200).json(docs);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// working
router.get('/:categoryId', (req, res, next) => { // GET requests: URL (after coming here, so /categories/
	const paramId = req.params.categoryId;

	Category.find({id: paramId})//findById(id)
	.exec()
	.then(doc => {
		console.log(doc);
		if (doc){
			res.status(200).json(doc);	
		} else{
			res.status(500).json({error: 'InvalidId'});
		}
		
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});
})

router.post('/', (req, res, next) => { // GET requests: URL (after coming here, so /categories/
	/*const category = { // Extract JSON category object from request
		id: req.body.id,
		name: req.body.name,
		childrenIds: req.body.childrenIds
	};*/
	const category = new Category({ // Extract JSON category object from request
		//_id: new mongoose.Types.ObjectId(),
		id: req.body.id,
		name: req.body.name,
		childrenIds: req.body.childrenIds
	});
	category.save()
	.then(result => {
			console.log(result);
			res.status(200).json({
			message: result//ok: true
		});
	})
	.catch(err => {
			console.log(err);
			res.status(500).json({
			message: err
		});
	});
	
});

// working
router.delete("/:productId", (req, res, next) => {
	const paramId = req.params.productId;
	Category.deleteMany({id: paramId}).exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	});
});

module.exports = router;