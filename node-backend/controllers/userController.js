import mongoose from 'mongoose';
import jwt from "jsonwebtoken";

// User model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    likedBooks : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Books'}]
});
const Users = mongoose.model('Users', UserSchema);

const likeProducts = (req,res) =>{
    console.log(req.body)
    let bookId = req.body.bookId;
   
    let userId = req.body.userId;
    if (!bookId || !userId) {
        return res.status(400).send({ message: 'bookId and userId are required' });
    }
   
    
    Users.updateOne({ _id: userId}, { $addToSet:{ likedBooks: bookId}})
    .then(() => {
        res.send({ message: 'Book liked successfully' });
    }).catch((error)=>{
        console.error('Error', error); // Log the error
        res.send({ message: 'Error' });
    })

}
const signup = async (req, res) => {
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
}

const login = async (req, res) => {
    //const { username, password } = req.body;
    console.log(req.body)
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
                }}
        }).catch(()=>{
            res.send({message: 'server error'})
        })
}
const userId =(req,res)=>{
    const _userId = req.params.uId
    Users.findOne({_id: _userId})
    .then((result)=>{
        res.send({message:'success', user: { email:result.email,mobile: result.mobile,username: result.username,}})
    })
    .catch(()=>{
        res.send({message:'error'})
    })
}

const Myprofile =(req,res)=>{

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
}

const likedbooks =(req,res)=>{
    Users.findOne({_id: req.body.userId}).populate('likedBooks')
    .then((result)=>{
        console.log(result,"added books")
        
        res.send({message:'success',Book: result.likedBooks})
        }).catch((error)=>{ 
            console.error('Error fetching books:', error); // Log the error
        }
)
}


export {likeProducts,signup,login, userId,Myprofile,likedbooks};