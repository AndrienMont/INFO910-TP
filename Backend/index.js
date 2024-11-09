const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'INFO910';
const client = new MongoClient(url);

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: '50mb' })); // Increase the payload size limit

http.listen(3000, function(){
    console.log('Server started on port 3000');
});

app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/users', async function(req, res){
    try {
        await client.connect()
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const collection = db.collection('users');
        const result = await collection.find().toArray();
        console.log('Found the following records:');
        console.log(result);        
        res.status(200).json(result);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }finally{
        client.close();
    }
});

app.post('/register', async function(req, res){
    try{
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const collection = db.collection('users');
        let newUser = req.body;
        const result = await collection.insertOne(newUser);
        console.log('Inserted new user');
        console.log(result);
        res.status(200).json(result);
    }catch (err){
        res.status(400).json({ message: err.message });
    }finally{
        client.close();
    }
});

app.post('/login', async function(req, res){
    try{
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const collection = db.collection('users');
        let user = req.body;
        const result = await collection.findOne(user);
        console.log('Found the following user:');
        console.log(result);
        res.status(200).json(result);
    }catch (err){
        res.status(400).json({ message: err.message });
    }finally{
        client.close();
    }
});

app.post('/publish', async function(req, res){
    try{
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const collection = db.collection('estates');
        let newEstate = req.body;
        const result = await collection.insertOne(newEstate);
        res.status(200).json(result);
    }catch (err){
        res.status(400).json({ message: err.message });
    }finally{
        client.close();
    }
});

app.get('/sellableEstates', async function(req, res){
    try {
        await client.connect()
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const collection = db.collection('estates');
        const result = await collection.find({ buyer: "" }).toArray(); // Filter estates with buyer as empty string
        console.log('Found the following records:');
        console.log(result);        
        res.status(200).json(result);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }finally{
        client.close();
    }
})

const { ObjectId } = require('mongodb');

app.delete('/deleteEstate/:id', async function(req, res){
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const collection = db.collection('estates');
        const estateId = req.params.id; // Récupérer l'ID depuis l'URL
        
        // Utiliser ObjectId pour transformer l'ID en un type compatible avec MongoDB
        const result = await collection.deleteOne({ _id: new ObjectId(estateId) });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Estate not found" });
        }
        
        console.log('Deleted the estate with ID: ' + estateId);
        res.status(200).json({ message: 'Estate deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        client.close();
    }
});