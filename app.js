const express = require('express');
const app = express(); // initiate express application to access its functions

app.use((req, res, next) => {
	res.status(200).json({ //use response to send a json response
		message: 'It works!'
	});
});

module.exports = app;