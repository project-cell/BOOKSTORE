import React from 'react'
import { useEffect,useState } from "react"
import Header from "./Header"
import { useNavigate,Link,useParams } from "react-router-dom"
import axios from 'axios'
import './Home.css'
import API_URL from '../constants'

export default function Edit_books() {
    const navigate = useNavigate();
    const [bookname, setbookname] = useState("");
    const [description, setdescription] = useState("");
    const [bookprice, setbookprice] = useState(" ");
    const [bookcategory, setbookcategory] = useState("");
    const [bookimage, setbookimage] = useState("");

    const p  = useParams();
    // console.log(p);

    useEffect(()=>{
        if(!localStorage.getItem('token')){
        navigate('/login')

        }},[])

    useEffect(()=>{
        const url = API_URL + '/get-book/' + p.id;
        axios.get(url)
        .then((res)=>{
        console.log(res)
        if (res.data.Book){
        console.log(res.data.Book)
        let Book = res.data.Book
        setbookname(Book.bookname)
        setdescription(Book.description)
        setbookprice(Book.bookprice)
        setbookcategory(Book.bookcategory)
        setbookimage(Book.bookimage)
         }

        }).catch((er)=>{
          console.log(er);
        alert('something went wrong')
         })
            
    },[])
        
    const handleApi=()=>
        {

          navigator.geolocation.getCurrentPosition((position)=>{
          console.log(position.coords.latitude)
          console.log(position.coords.longitude)
          const formData = new FormData();
          formData.append('booklat', position.coords.latitude);//key: value pair
          formData.append('booklong', position.coords.longitude);//key: value pair
          formData.append('bookname', bookname);//key: value pair
          formData.append('description', description);
          formData.append('bookprice', bookprice);
          formData.append('bookcategory', bookcategory);
          formData.append('bookimage', bookimage);
          formData.append('userId', localStorage.getItem('userId'));
          
          const url = API_URL+'/add-product';

          axios.post(url,formData).then((res)=>{
            if(res.data.message){
              alert(res.data.message);
              navigate('/')
              
            }
          })  
          .catch((er)=>{  
            alert(er)
          })
        }

      )}

    
return (
    
    <div className="home h-full bg-gradient-to-t from-blue-300 to-pink-200 text-center flex flex-col  "> 
        <Header />
    <h2 className='links text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text pt-3' >
                    Edit Books
    </h2>
        <div className='font-bold font-sans p-2  '>
        <label className='p-1'> Book name</label>
        <input className='form-control  max-w-lg mx-auto gap-5  bg-slate-200 p-2 rounded-lg ' type='text' placeholder='Book name:' value={bookname}
         onChange={(e)=>{setbookname(e.target.value)}}
         ></input>

        <label className='p-1'> Description</label>
        <input className='form-control  max-w-lg mx-auto gap-5  bg-slate-200 p-2 rounded-lg' type='text' placeholder='Description:' value={description} onChange={(e)=>{setdescription(e.target.value)}}></input>

        <label className='p-1'>Book price</label>
        <input className='form-control  max-w-lg mx-auto gap-5  bg-slate-200 p-2 rounded-lg ' type='number' placeholder='Book price: max amount 999' value={bookprice} onChange={(e)=>{setbookprice(e.target.value)}} min="0" max="999"></input>

        <label className='p-1'>Book Category</label>
        <select className= 'form-control max-w-lg mx-auto gap-5 bg-slate-200 p-2 rounded-lg' type='text' placeholder='Book category:' value={bookcategory} onChange={(e)=>{setbookcategory(e.target.value)}}>
            <option>Book category:</option>
            <option> None</option>
            <option> NCERT </option>
            <option> Academic Book for grade LKG to grade 12th</option>
            <option> Story Book</option>
            <option> Novel</option>
            <option> Fictional Book</option>
            <option> Non-fictional Book</option>
            
        </select>

        <label className='p-1'> Book image</label>
        <input className='form-control max-w-lg mx-auto  gap-5 bg-slate-200 p-2 rounded-lg ' type='file' placeholder='Book image:' 
         onChange={(e)=>{setbookimage(e.target.files[0])}}
         ></input>
         <div className='flex  justify-center align-middle p-2 ' height='100vh'>
         <img  className='rounded-lg' width= "250px" height="300px" box-shadow= '0 4px 12px rgba(0, 0, 0, 0.5)' src={ API_URL + '/'+ bookimage  }/>
         </div>
 
         <button onClick ={handleApi}
    className='mt-3 form-control max-w-lg mx-auto bg-lime-200 text-black font-medium text-center p-3 rounded-lg uppercase hover:opacity-60 outline-lime-500 disabled:opacity-80 gap-4'> Save
     </button>
        </div>
    </div>
    )}
