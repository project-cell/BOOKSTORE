import mongoose from 'mongoose';

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

const search = (req,res) => {
    // console.log(req.query)
    if (req.query) {
        console.log(req.query);
    } else {
        console.log("req.query is undefined");
    }
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

            }}
})
    .then((results)=>{
        res.send({message:'success',Book:results})
        }).catch((error)=>{ 
            console.error('Error fetching books:', error); // Log the error
        })
}

const addProducts = (req,res)=>{
    console.log(req.body)
    if (req.file) {
        console.log("File path:", req.file.path);
    } else {
        console.log("No file uploaded");
    }
    // console.log(req.file.path)
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
    
}

const getBooks = (req,res)=>{
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
}

const deleteBooks =(req,res)=>{
    console.log(req.body)
    Books.findOne({_id: req.body.bookId})
    .then((result)=>{
        // console.log(result.addedBy == req.body.userId)
        if(result.addedBy == req.body.userId){
            Books.deleteOne({_id : req.body.bookId})
            .then((deleter) => {
                if(deleter.acknowledged){
                res.send({ message: 'Book deleted successfully' });
                }
            })
        }
        })
    .catch((error)=>{
         console.error('Error deleting book:', error); // Log the error
            })
}



const getBookId = (req,res)=>{
    // console.log(req.params)
    if (req.params) {
        console.log("Request parameters:", req.params);
    } else {
        console.log("req.params is undefined");
    }
    Books.findOne( {_id: req.params.id}).then((result)=>{
        console.log(result,"added books")
        res.send({message:'success',Book:result})
        }).catch((error)=>{ 
            console.error('Error fetching books:', error); // Log the error
        }
)
}

const myBooks =(req,res)=>{
    const userId = req.body.userId

    Books.find({addedBy: userId})
    
    .then((result)=>{
        console.log(result,"added books")
        res.send({message:'success',Book: result})
        }).catch((error)=>{ 
            console.error('Error fetching books:', error); // Log the error
        }
)
}


export  {search, addProducts ,deleteBooks, getBooks, getBookId, myBooks};