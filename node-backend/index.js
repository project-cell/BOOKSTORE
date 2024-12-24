import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import multer from 'multer';
import path,{dirname} from 'path';
import { fileURLToPath } from 'url';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
// import bookController from './controllers/bookController.js'
import {likeProducts, login, signup, userId,Myprofile, likedbooks}  from './controllers/userController.js'
import {search,getBooks,getBookId, myBooks} from './controllers/bookController.js'; // Make sure to include the .js extension
import {addProducts} from './controllers/bookController.js'; // Make sure to include the .js extension


dotenv.config();
const app = express();
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
const port = 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
const mongoURL =  'mongodb://localhost:27017/Bookrecycle';
mongoose.connect(mongoURL, {  })
    .then(() => console.log('Connected to MongoDB server'))
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

const db = mongoose.connection;
db.on("disconnected", () => {
    console.log('Disconnected from MongoDB server');
});
db.on("error", (error) => {
    console.log('Error in MongoDB server:', error);
});

// // User model
// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     password: { type: String, required: true },
//     email: { type: String, required: true },
//     mobile: { type: Number, required: true },
//     likedBooks : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Books'}]
// });
// const Users = mongoose.model('Users', UserSchema);



// Routes
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/search',search)

app.post('/like-book',likeProducts)

app.post('/add-product',upload.single('bookimage'),addProducts)

app.get('/get-books',getBooks)

app.get('/get-book/:id',getBookId)

app.post('/liked-book',likedbooks)

app.post('/my-book',myBooks)

app.get('/my-profile/:userId',Myprofile)

app.get('/get-user/:uId',userId)

app.post('/signup',signup);

app.post('/login', login)


// Start server
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
