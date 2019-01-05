const express = require('express');

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
	res.status(200).json(categories) //'Handling GET requests to /categories'
});

router.get('/:categoryId', (req, res, next) => { // GET requests: URL (after coming here, so /categories/
	const id = req.params.categoryId;
	res.status(200).json({
		message: 'Handling individual GET requests to /categories'
	});
})

router.post('/', (req, res, next) => { // GET requests: URL (after coming here, so /categories/
	const category = { // Extract JSON category object from request
		id: req.body.id,
		name: req.body.name,
		childrenIds: req.body.childrenIds
	};
	res.status(200).json({
		message: 'Handling POST requests to /categories',
		category: category
	});
});

module.exports = router;