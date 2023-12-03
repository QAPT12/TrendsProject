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
   try {
      console.log ("Asking for all collection names");
      js = await db.listCollections().toArray();
      console.log (js);
      res.send (await db.listCollections().toArray());
   } catch (error) {
      console.log("DB Error!:", error);
   }
   
});

// gets all the data of a collection
router.get('/query/:docname', async (req, res) => {
   const requestedCollectionName = req.params.docname;
   console.log("Querying " + requestedCollectionName);

   const collection = db.collection(requestedCollectionName);
   const data = await collection.find({}).toArray();

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

router.post('/addData', (req, res) => {
   console.log("Request object: ",req.body);
   // const data = req.body.data;
   const username = req.body.username;
   const title = req.body.title;
   const content = req.body.content;
   const score = req.body.score;
   const creationDate = req.body.creationDate;
   const collectionName = req.body.collection;
   

   // Assuming you have a MongoDB client (e.g., MongoDB Node.js driver) initialized
   const collection = db.collection(collectionName);

   // Insert the data into the MongoDB collection
   collection.insertOne({username: username, title: title, content: content, score: score, creationDate: creationDate});
   res.send("Completed insert request!");
});

//export this router to use in our index.js
module.exports = router;