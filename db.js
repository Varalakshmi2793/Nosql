const { MongoClient } = require('mongodb');

class MongoDBConnectionManager {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect(uri, dbName) {
    if (!this.client) {
      this.client = new MongoClient(uri);
      await this.client.connect();
      console.log("Connected to MongoDB");
      this.db = this.client.db(dbName);
    }
    return this.db;
  }

  getDb() {
    if (!this.db) {
      throw new Error("MongoDB is not connected. Call connect first.");
    }
    return this.db;
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log("Disconnected from MongoDB");
    }
  }
}

module.exports = new MongoDBConnectionManager();
