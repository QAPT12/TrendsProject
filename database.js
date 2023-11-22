// Used by the database server (index.js) to perform GET and POST requests


var express = require('express');
var router = express.Router();

router.use(express.json());

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://UnusualFrog:Password1@jstest.ixydzm5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

var db=null;

router.get('/', (req, res) => {
   res.send('GET route on things.');
});

// connect to a database
router.get('/connect/:dbname', async (req, res) => {
   if (db == null) {
      try {
         await client.connect();
         db = client.db(req.params.dbname);
         res.send("Success");
         console.log("Connected to MongoDB");
      }
      catch (error){
         console.log ("error connecting to DB");
         res.send("Fail: "+ error.message);
      }
      finally {
      }
   }
   else{
      res.send('Fail: Already connected to a database');
   }
});

router.get ('/getcollections/', async (req, res) => {
   console.log ("Asking for all collection names");
   js = await db.listCollections().toArray();
   console.log (js);
   res.send (await db.listCollections().toArray());
});

// query a database
router.get('/query/:docname', async (req, res) => {

   console.log ("Querying " + req.params.docname);

   const collection = db.collection(collectionname);
   const data = await collection.find({}).toArray();

   //console.log ("Data is");
   // data.forEach ((item) => {console.log(JSON.stringify(item));});
   res.send(JSON.stringify(data));
});

// disconnect from a database
router.get('/disconnect/', async (req, res) => {
   // disconnect from database
   if (db != null) {
      try {
         await client.close();
         db = null;
         res.send('Success');
         console.log("Connection to MongoDB closed");
      }
      catch (error){
         console.log ("error closing connection\n" + error);
      }
      finally {
      }
   }
});

router.post('/', (req, res) => {
   res.send('POST route on things.');
});

// Example server-side route using Express
router.post('/addData', (req, res) => {
   console.log("Request object: ",req.body);
   const data = req.body.data;
   const username = req.body.username;
   const title = req.body.title;
   const collectionName = req.body.collection;

   // Assuming you have a MongoDB client (e.g., MongoDB Node.js driver) initialized
   const collection = db.collection(collectionName);

   // Insert the data into the MongoDB collection
   collection.insertOne({ data: data, username: username, title: title });
   res.send("Completed insert request!");
});

//export this router to use in our index.js
module.exports = router;