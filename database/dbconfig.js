const { MongoClient } = require('mongodb');

let database;

const DBInit = async (callback) => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL environment variable is not set');
    }

    if (database) {
      console.log('Mongo is initialized!');
      if (callback) callback(null, database);
      return database;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URL);
    database = client.db();
    console.log('Connected to Mongo');
    if (callback) callback(null, database);
    return database;
  } catch (err) {
    console.error('Error initializing DB', err);
    if (callback) callback(err);
    throw err;
  }
};

const RD = () => {
  if (!database) {
    throw new Error('Mongo not initialized');
  }
  return database;
};

module.exports = {
  DBInit,
  RD
};
