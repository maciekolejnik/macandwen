import { MongoClient } from 'mongodb';
import config from '../../config.json' assert { type: "json" };

class DbService {
  constructor() {
    this.client = new MongoClient(config.db.uri, {
        tlsCertificateKeyFile: config.db.certFile
    });
    this.db = null;
  }

  async connect(dbName) {
    try {
      await this.client.connect();
      this.db = this.client.db(dbName);
      console.log(`Connected to MongoDB: ${dbName}`);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  async close() {
    try {
      await this.client.close();
      console.log('MongoDB connection closed');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    }
  }

  getCollection(collectionName) {
    return this.db.collection(collectionName);
  }

  async findDocuments(collectionName, query) {
    const collection = this.getCollection(collectionName);
    try {
      const result = await collection.find(query).toArray();
      return result;
    } catch (error) {
      console.error('Error querying MongoDB:', error);
      throw error;
    }
  }

  // Add more methods as needed (e.g., insert, update, delete)
}

export default DbService;

