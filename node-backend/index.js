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

// User model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    likedBooks : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Books'}]
});
const Users = mongoose.model('Users', UserSchema);

let schema = new mongoose.Schema({
    bookname: String,
    description: String,
    bookprice: String,
    bookcategory:String,
    bookimage:String,
    addedBy: mongoose.Schema.Types.ObjectId,
    pLoc:{
        type:{
            type: String,
            enum:['Point'],
            default: 'Point'
        },
        coordinates:{
            type:[Number],
            }}

    
    });

    schema.index({pLoc: '2dsphere'})

const Books =mongoose.model('Books',schema);

// Routes
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/search',(req,res)=> {
    console.log(req.query)
    // if (!req.query.loc) {
    //     return res.status(400).send({ message: 'Location parameter is required' });
    // }

    let latitude = req.query.loc.split(',')[0]
    let longitude = req.query.loc.split(',')[1]
    
    // // Check if 'loc' is defined
    // if (!req.query.loc) {
    //     return res.status(400).send({ message: 'Location parameter is required' });
    // }

    // // Safely split the 'loc' parameter
    // const locParts = req.query.loc.split(',');
    // if (locParts.length < 2) {
    //     return res.status(400).send({ message: 'Invalid location format. Expected format: lat,long' });
    // }

    // let latitude = locParts[0];
    // let longitude = locParts[1];



    let search = req.query.search;


    Books.find({$or: 
        [
        {bookname: { $regex: search} },
        {description: { $regex: search} },
        {bookprice: { $regex: search } },
        {bookcategory: { $regex: search} },
        ],
        pLoc: { 
            $near: {
                $geometry: 
                {
                    type: 'Point',
                    coordinates: [parseFloat(longitude), parseFloat(latitude)] 
                },
                 $maxDistance: 700 * 10000

            }
         }

          


})
    .then((results)=>{
        res.send({message:'success',Book:results})
        }).catch((error)=>{ 
            console.error('Error fetching books:', error); // Log the error
        })
})

app.post('/like-book', (req, res) => {
    let bookId = req.body.bookId;
    let userId = req.body.userId;
    // console.log(req.body)
    Users.updateOne({ _id: userId}, { $addToSet:{ likedBooks: bookId}})
    .then(() => {
        res.send({ message: 'Book liked successfully' });
    }).catch((error)=>{
        console.error('Error', error); // Log the error
        res.send({ message: 'Error' });
    })


})

app.post('/add-product',upload.single('bookimage'),(req,res)=>{
    console.log(req.body)
    console.log(req.file.path)
    const booklat =req.body.booklat;
    const booklong =req.body.booklong;
    const bookname =req.body.bookname;
    const description =req.body.description;
    const bookprice =req.body.bookprice;
    const bookcategory =req.body.bookcategory;
    const bookimage =req.file ? req.file.path : null;
    const addedBy =  req.body.userId;
    if (!bookimage) {
        return res.status(400).send({ message: 'Book image is required' });
    }
    const Book = new Books({
        bookname,description,bookprice,bookcategory,bookimage,addedBy,
        pLoc: {type:'Point', coordinates: [booklat, booklong] }

        })
    Book.save()
    .then(() => {
        res.send({ message: 'Book added successfully' });
    }).catch((error)=>{
        console.error('Error adding book:', error); // Log the error
        res.send({ message: 'Error adding book' });

    })
    
})

app.get('/get-books',(req,res)=>{
    const catName = req.query.catName
    console.log (catName)
    let _f ={}
    if(catName){
        _f = {bookcategory:catName}
    }
    Books.find(_f)
    .then((result)=>{
        // console.log(result,"added books")
        res.send({message:'success',Book:result})
        }).catch((error)=>{ 
            console.error('Error fetching books:',error); // Log the error
        }
)
})


app.get('/get-book/:id',(req,res)=>{
    console.log(req.params)
    Books.findOne( {_id: req.params.id}).then((result)=>{
        console.log(result,"added books")
        res.send({message:'success',Book:result})
        }).catch((error)=>{ 
            console.error('Error fetching books:', error); // Log the error
        }
)
})

app.post('/liked-book',(req,res)=>{
    Users.findOne({_id: req.body.userId}).populate('likedBooks')
    .then((result)=>{
        console.log(result,"added books")
        res.send({message:'success',Book: result.likedBooks})
        }).catch((error)=>{ 
            console.error('Error fetching books:', error); // Log the error
        }
)
})

app.post('/my-book',(req,res)=>{
    const userId = req.body.userId

    Books.find({addedBy: userId})
    
    .then((result)=>{
        console.log(result,"added books")
        res.send({message:'success',Book: result})
        }).catch((error)=>{ 
            console.error('Error fetching books:', error); // Log the error
        }
)
})


app.get('/my-profile/:userId',(req,res)=>{

    let uid = req.params.userId;
    Users.findOne({ _id: uid }).then((result) => {
        // console.log(result,"added books")
        res.send({message:'success',user:{
            username:result.username,
            email:result.email,
            mobile:result.mobile,
            // likedBooks:result.likedBooks
        }
        })
        }).catch((error) => {
            console.error('Error fetching books:', error); // Log the error
            }
            )

    // const userId = req.params.uId
    // Users.findOne({_id: userId})
    // .then((result)=>{
    //     res.send({message:'success', user: { email:result.email,mobile: result.mobile,username: result.username,}})
    // })
    // .catch(()=>{
    //     res.send({message:'error'})
    // })
})



app.get('/get-user/:uId',(req,res)=>{
    const _userId = req.params.uId
    Users.findOne({_id: _userId})
    .then((result)=>{
        res.send({message:'success', user: { email:result.email,mobile: result.mobile,username: result.username,}})
    })
    .catch(()=>{
        res.send({message:'error'})
    })
})

app.post('/signup', async (req, res) => {
    const { username, password, email, mobile} = req.body;
    console.log(`Signup attempt for username: ${username}`); // Log signup attempt
    console.log(`Signup attempt for email: ${email}`); // Log signup attempt

    try {
                         // Hash the password
        //const hashedPassword = await bcrypt.hash(password, 10);
        //console.log(`Signup attempt for password: ${hashedPassword}`);
        const user = new Users({ username, password: password, email, mobile });

        await user.save();
        res.send({ message: 'User  data saved successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error in saving user data', error: error.message });
    }
});

app.post('/login', async (req, res) => {
    //const { username, password } = req.body;
    const { email, password } = req.body;
    console.log(`Login attempt for username: ${email}`); // Log login attempt

    Users.findOne({email})
        .then((result)=>{
            console.log(result,"user data")
            if(!result){
                res.send({message: 'User Not found'})
            }
            else{

                if(result.password == password){
                    const token= jwt
                    .sign({data: result},'MYKEY',{expiresIn: 60*60})

                    res.send({message: 'password success',token:token, userId: result._id})
                }
                if(result.password != password){
                    res.send({message: 'password wrong'})
                }
               
            }
        }).catch(()=>{
            res.send({message: 'server error'})
        })
})


// Start server
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});