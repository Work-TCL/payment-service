import mongoose from 'mongoose';
import express from 'express'
import { DB_URL } from '../../config';

const dbUrl: string = "mongodb+srv://akshay10sangani:AwBwKAyYztq6VcrT@truereff-dev.q73cv.mongodb.net/truereff-dev";
console.log('AL: dbUrl', dbUrl)

const mongooseConnection = express()

mongoose.set('strictQuery', true);
mongoose.connect(
    dbUrl
).then(() => console.log('Payment Database successfully connected.')).catch(err => console.log("Payment Database Connection Error==>", err));

export { mongooseConnection }