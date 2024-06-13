const express = require('express');
const app = express();
const dbManager = require('./db');

(async () => {
  try {
    const db = await dbManager.connect('mongodb://localhost:27017/', 'my_database');
    const collection = db.collection('my_collection');

    // Example route to demonstrate database usage
    app.get('/', async (req, res) => {
      try {
        const message = "Welcome to MongoDB with Express!";
        // Optionally, you could fetch data from the collection
        // const result = await collection.findOne({});
        res.send(message);
      } catch (error) {
        res.status(500).send('Error fetching data from MongoDB');
      }
    });

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
