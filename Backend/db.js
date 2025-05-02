const mongoose  = require('mongoose');

require('dotenv').config();

//Loading environment variables from .env file
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

//MongoDB connection string
const mongoURI = `mongodb+srv://${username}:${password}@cluster0.xftszud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectToMongoose = () => {
    mongoose.connect(mongoURI)
    console.log("Connected to MongoDB");
}

module.exports = connectToMongoose;