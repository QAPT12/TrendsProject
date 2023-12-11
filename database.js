// Used by the database server (index.js) to perform GET and POST requests

var express = require('express');
var router = express.Router();

router.use(express.json());

const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');

const uri = "mongodb+srv://UnusualFrog:Password1@jstest.ixydzm5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

var db = null;

router.get('/', (req, res) => {
   res.send('GET route on things.');
});

// Connect to a database
router.get('/connect/:dbname', async (req, res) => {
   if (db == null) {
      try {
         await client.connect();
         db = client.db(req.params.dbname);
         res.send("Success");
         console.log("Connected to MongoDB");
      }
      catch (error) {
         console.log("error connecting to DB");
         res.send("Fail: " + error.message);
      }
      finally {
      }
   }
   else {
      res.send('Fail: Already connected to a database');
   }
});

// Gets available collections
router.get('/getcollections/', async (req, res) => {
   try {
      console.log("Asking for all collection names");
      js = await db.listCollections().toArray();
      res.send(await db.listCollections().toArray());
   } catch (error) {
      console.log("DB Error!:", error);
   }

});

// Gets all the data of a collection
router.get('/query/:docname', async (req, res) => {
   const requestedCollectionName = req.params.docname;
   console.log("Querying " + requestedCollectionName);

   const collection = db.collection(requestedCollectionName);
   const data = await collection.find({}).toArray();

   res.send(JSON.stringify(data));
});

// Disconnect from a database
router.get('/disconnect/', async (req, res) => {
   if (db != null) {
      try {
         await client.close();
         db = null;
         res.send('Success');
         console.log("Connection to MongoDB closed");
      }
      catch (error) {
         console.log("error closing connection\n" + error);
      }
      finally {
      }
   }
});

router.post('/', (req, res) => {
   res.send('POST route on things.');
});

// For creating new threads
router.post('/addData', (req, res) => {
   console.log("Request object: ", req.body);
   const username = req.body.username;
   const title = req.body.title;
   const content = req.body.content;
   const creationDate = req.body.creationDate;
   const score = req.body.score;
   const comments = req.body.comments;
   const collectionName = req.body.collection;
   const collection = db.collection(collectionName);

   // Insert the data into the MongoDB collection
   collection.insertOne({ username: username, title: title, content: content, score: score, creationDate: creationDate, comments: comments });
   res.send("Completed insert request into" + collectionName);
});

// For updating comments list
router.post('/updateData/:id/addComment', async (req, res) => {
   try {
      const postId = req.params.id;
      const newComment = req.body.newComment;
      const collection = db.collection(req.body.collection);

      // Find the document with the specified ID
      const existingPost = await collection.findOne({ _id: new ObjectId(postId) });

      if (!existingPost) {
         return res.status(404).send("Post not found");
      }
      // Update the comments array by adding the new comment
      existingPost.comments.push(newComment);

      // Update the document in the MongoDB collection
      const result = await collection.updateOne(
         { _id: new ObjectId(postId) },
         { $set: { comments: existingPost.comments } }
      );

      if (result.modifiedCount === 1) {
         return res.send("Comment added successfully");
      } else {
         return res.status(500).send("Failed to add comment");
      }
   } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).send("Internal Server Error");
   }
});

// For updating the score of a record
router.post('/updateData/:id/updateScore', async (req, res) => {
   try {
      const recordId = req.params.id;
      const scoreToAdd = req.body.scoreToAdd;
      const collection = db.collection(req.body.collection);

      // Find the document with the specified ID
      const existingRecord = await collection.findOne({ _id: new ObjectId(recordId) });

      if (!existingRecord) {
         return res.status(404).send("Record not found");
      }

      // Update the score by adding the new score value
      existingRecord.score = (existingRecord.score || 0) + scoreToAdd;

      // Update the document in the MongoDB collection
      const result = await collection.updateOne(
         { _id: new ObjectId(recordId) },
         { $set: { score: existingRecord.score } }
      );

      if (result.modifiedCount === 1) {
         return res.send("Score updated successfully");
      } else {
         return res.status(500).send("Failed to update score");
      }
   } catch (error) {
      console.error("Error updating score:", error);
      res.status(500).send("Internal Server Error");
   }
});

//export this router to use in our index.js
module.exports = router;