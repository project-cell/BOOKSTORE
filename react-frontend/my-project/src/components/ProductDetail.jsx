import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import Header from "./Header.jsx"
import API_URL from '../constants.js';

function ProductDetail() {
    const [Book, setBook] = useState();
    const [user, setUser] = useState();
    // console.log(user, "userrrr")

    const p  = useParams();
    console.log(p.id);

    useEffect(()=>{
        const url = API_URL + '/get-book/' + p.id;
        axios.get(url)
        .then((res)=>{
            console.log(res)
            if (res.data.Book){
                setBook(res.data.Book);
            }
          }).catch((er)=>{
          console.log(er);
          alert('something went wrong')
          })

    },[])
    //useEffect is a hook that allows you to run some side effect after rendering the component

    const handleContact = (addedBy)=>
    {
        console.log('id', addedBy)
        const url = API_URL + '/get-user/' + addedBy;
        axios.get(url)
        .then((res)=>{
            console.log(res)
            if (res.data.user){
                setUser(res.data.user);
            }
          }).catch((er)=>{
          console.log(er);
          alert('something went wrong')
          })
    } 

  return (
    <div className='text-center h-full bg-gradient-to-t from-blue-300 to-pink-200" '>
        <Header />
        <div className='p-3 text-pretty font-bold font-serif text-2xl underline text-cyan-700'>
        BOOK DETAILS:
        </div>
       
        {
            Book && <div className='text-2xl font-serif font-bold'> {Book.bookname} </div>
        }
       {Book && <div className="d-flex justify-content-center flex-wrap">
            <div className= 'card m-3 text-center items-center p-3 font-medium text-black-900'>
            < img  width= "500px" height="400px" src= {API_URL+ '/' + Book.bookimage} alt=""  />
            </div>
            <ul className='p-4 text-left'>
        <li className='p-2 ml-2 font-bold font-sans text-cyan-700 text-xl'>Book Description and info: {
            Book && <div className='text-xl p-1 text-black italic font-mono'> {Book.description} </div>
        }</li>
        <li className='p-2 ml-2 font-bold font-sans text-cyan-700 text-xl'>Book Price: {
            Book && <div className='text-xl p-1 text-black italic font-mono'> {Book.bookprice} </div>
        }</li>
        <li className='p-2 ml-2 font-bold font-sans text-cyan-700 text-xl'> Book Category: { Book && <div className='text-xl p-1 text-black italic font-mono'> {Book.bookcategory} </div>}</li>
        { Book.addedBy &&  
            <button className='p-2 ml-2 font-bold font-sans text-cyan-700 text-xl' onClick = {()=> handleContact(Book.addedBy)}> 
                Show Contact Details
            </button>}
            {user && user.username && <div className='text-xl text-center p-1 text-black italic font-mono'> <h4 > {user.username }</h4></div>}
            {user && user.email && <div className='text-xl text-center p-1 text-black italic font-mono'> <h4 > {user.email }</h4></div>} 
            {user && user.mobile && <div className='text-xl text-center p-1 text-black italic font-mono'> <h4 > {user.mobile}</h4></div>} 

        </ul>

        </div>}
        
    </div>
  )
}

export default ProductDetail
