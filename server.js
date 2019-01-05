const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000; // if there is an environment port use it. Else, use 3000

const server = http.createServer(app); // creates server to process requests

server.listen(port);