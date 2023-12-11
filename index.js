// Used to start the database server
// run "node index.js" to start the database server
// Check is running by visiting http://localhost:3000/

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const database = require('./database.js');

app.use('/', database);
app.listen(3000);