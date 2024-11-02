const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'INFO910';

console.log('Attempting to connect to MongoDB...');

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
    if (err) {
        console.error('MongoDB connection error:', err);
        return;
    }
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('users');

    console.log('Attempting to fetch documents from the users collection...');

    collection.find({}).toArray(function(err, users) {
        if (err) {
            console.error('Error fetching users:', err);
        } else if (users.length === 0) {
            console.log('No users found in the collection');
        } else {
            console.log('Fetched users:', users);
        }
        client.close();
    });
});
