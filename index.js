// Used to start the database server
// run "node index.js" to start the database server
// Check is running by visiting http://localhost:3000/

const express = require('express');
const cors = require('cors'); // this is required to prevent the server (this code) from rejecting fetch requests.
const app = express();
app.use(cors()); // necessary as per above.

const database = require('./database.js');

app.use('/', database);
app.listen(3000);