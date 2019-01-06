const express = require('express');
const app = express(); // initiate express application to access its functions
const morgan = require('morgan'); // server log service
const bodyParser = require('body-parser'); // facilitates HTTP body parsing on requests
const mongoose = require('mongoose'); // mongodb

const categoryRoutes = require('./api/routes/categories');

mongoose.connect('mongodb+srv://node-test:'+process.env.MONGO_ATLAS_PW+'@node-test-zzvms.mongodb.net/test?retryWrites=true',
	{
		//useMongoClient: true,
		useNewUrlParser: true
	}
);

/*app.use((req, res, next) => {
	res.status(200).json({ //use response to send a json response
		message: 'It works!'
	});
});
*/

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); // Allow access to this server to all clients
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Select which headers to allow in
	if (req.method === "OPTIONS"){
		req.header("Access-Control-Allow-Methods", "GET, POST");
		return res.status(200).json({});
	}
	next();
});

// After logging and parsing, directs request to specified route
app.use('/categories', categoryRoutes); // Anything that starts with /categories, will be redirected to variable categoryRoutes

app.use((req, res, next) => {
	const error = new Error('URL not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		message: error.message
	})
});

module.exports = app;