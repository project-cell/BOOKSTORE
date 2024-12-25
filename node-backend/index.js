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


// import bcrypt from 'bcrypt';
// import jwt from "jsonwebtoken";
// import bookController from './controllers/bookController.js'
import {likeProducts, login, signup, userId,Myprofile,likedbooks}  from './controllers/userController.js'
import {search,getBooks,getBookId, myBooks,addProducts} from './controllers/bookController.js'; // Make sure to include the .js extension


const API_URL = process.env.API_URL || 'http://localhost:3000'; // Fallback to default if not set
console.log(API_URL); // Use the API URL
console.log( process.env ,"API_URL");

dotenv.config();
const app = express();

app.use('/uploads',express.static(path.join(__dirname,'uploads')))
const port = 3000;

// Middleware
// Allow requests from both localhost and your Netlify
        // const allowedOrigins = ['http://localhost:5173', 'https://charming-elf-5fd748.netlify.app'];
        // app.use(cors({
        //     origin: allowedOrigins,
        //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
        //     credentials: true // If you need to allow cookies or authentication
        // }));
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
// const mongoURL =  'mongodb+srv://helloworld:Ho6oGu69Zd1yEygz@cluster0.yduksfk.mongodb.net/Bookrecycle?retryWrites=true&w=majority';
const mongoURL =  'mongodb://localhost:27017/Bookrecycle';
// const mongoURL =  'mongodb://127.0.0.1:27017/Bookrecycle';
mongoose.connect(mongoURL, {})
    .then(() => console.log('Connected to MongoDB server'))
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        // process.exit(1);
    });

    
const db = mongoose.connection;
db.on("disconnected", () => {
    console.log('Disconnected from MongoDB server');
});
db.on("error", (error) => {
    console.log('Error in MongoDB server:', error);
});

// const allowedOrigins = ['http://localhost:5173', 'https://singular-sable-9f0800.netlify.app'];
// Allow requests from both localhost and your Netlify
 const allowedOrigins = ['http://localhost:5173', 'https://charming-elf-5fd748.netlify.app'];

app.use(cors({
  origin: allowedOrigins,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  credentials: true // if you need to allow cookies or authentication
}));

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
