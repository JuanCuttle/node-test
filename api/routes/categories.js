const express = require('express');
const Category = require('../models/categories')
const mongoose = require('mongoose');

const router = express.Router(); // Router which will register routes

/*const categories = [{
	id: 1,
	name: 'one',
	childrenIds: []
}, {
	id: 2,
	name: 'two',
	childrenIds: []
}];*/

router.get('/', (req, res, next) => { // GET requests: URL (after coming here, so /categories/ 
	//res.status(200).json(categories)
	Category.find().exec()
	.then(docs => {
		console.log(docs);
		res.status(200).json(docs);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});
});

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

router.post('/', (req, res, next) => { // POST requests: URL (after coming here, so /categories/
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

	Category.find({id: category.id}).exec()
	.then(doc => {
		if (doc.length === 0){ // if category doesn't yet exist, check validity
			const childrenIds = category.childrenIds;

			//check if new category is valid
			Category.find({id: childrenIds}).exec()  // find child categories
			.then(result => {
				// if the number of returned categories equals the number of expected
				// categories, save the new category (ie, all exist in database). If not, ignore POST request
				if (result.length === childrenIds.length){
					category.save()
					.then(result => {
							console.log(result);
							res.status(200).json({
								//message: result
								ok: true
							});
					})
					.catch(err => { // save failed
							console.log(err);
							res.status(500).json({
							error: err
						});
					});
				} else { // return error if any child not found
					res.status(500).json({
			    		ok: false,
			    		error: 'InvalidCategories'
			    	});
				}
			})
			.catch(err => {
				res.status(500).json({error: err});
			});
		} else { // if category already exists, return error
			res.status(500).json({ok: false, error: 'CategoryAlreadyExists'})
		}
	})
	.catch(err => {
		res.status(500).json({error: err});
	});

	
});

router.delete("/:productId", (req, res, next) => {
	const paramId = req.params.productId;
	Category.deleteMany({id: paramId}).exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		//console.log(err);
		res.status(500).json({
			error: err
		})
	});
});

module.exports = router;