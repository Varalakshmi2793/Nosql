const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb://localhost:27017', 
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
    .then(client => {
      console.log('Connected to MongoDB!');
      _db = client.db('shop'); 
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
