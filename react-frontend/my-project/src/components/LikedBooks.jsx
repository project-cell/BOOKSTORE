import React,{ useEffect,useState } from "react"
import Header from "./Header.jsx"
import { useNavigate,Link } from "react-router-dom"
import axios from "axios";
import Categories from "./Categories.jsx";
// import { AiOutlineHeart } from "react-icons/ai";
// import { FaBeer } from "react-icons/fa";
// import { FaRegHeart } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'
import './Home.css'
function LikedBooks(){
    const navigate = useNavigate();
    const [Book, setBook] = useState([]);
    const [CBook, setCBook] = useState([]);
    const [search, setsearch] = useState('');


    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')

        }
    },[])

    useEffect(()=>{
        const url = 'http://localhost:3000/liked-book'
        let data ={userId : localStorage.getItem('userId')}
        axios.post(url,data )
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
    const handlesearch=(value)=>{
        setsearch(value);
    }
    const handleClick=(value)=>{
        // console.log('clicked')
        // console.log('Book',Book)
        let filteredBooks =Book.filter((item)=>{
            // console.log(item)
            if(item.bookname.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search)||
            item.bookcategory.toLowerCase().includes(search))
                {
                return item;
                }
        });
        setCBook(filteredBooks)
    }
        const handleCategory = (value)=>{
            let filteredBooks =Book.filter((item,index)=>{
                // console.log(value,'v')
                // console.log(item)
                if(item.bookcategory == value)
                    {
                        
                    return value;
                    
                    }
            });
            setCBook(filteredBooks)

        }

        const handleLike=(bookId)=>{
            let userId= localStorage.getItem('userId');
            console.log('userId','bookId', bookId,userId)
            const url = 'http://localhost:3000/like-book'
            const data = {userId, bookId}

        axios.post(url,data)
        .then((res)=>{
            console.log(res)
            if (res.data.message){
                alert('Liked:)')
            }
          }).catch((er)=>{
          console.log(er);
          alert('something went wrong')
          })
        }

        const handleProduct = (id) =>{
            navigate('/ProductDetail/' + id)
        }


    return (    
        <div className="home text-center">
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick}/> 
            
          <div className=' p-1.5 z-20 via-slate-500 font-semibold bg-purple-200 bg-opacity-100 backdrop-filter backdrop-blur-xl shadow-gray-950 justify-center overflow-hidden '> 
          <ul className='flex text-center gap-4 ml-7 text-clip font-semibold items-center'>
               {/* <ul className='flex gap-4 text-clip font-semibold '> */}
            { !!localStorage.getItem('token')&&<Link className="links" to="/Add_product"><button className=""> Add Books </button></Link>}
           </ul>
           </div>
           <Categories handleCategory={handleCategory}/>
           <h2 className="text-center underline text-3xl p-3 text-teal-700 font-bold font-serif" >
             Library at your Fingertips: </h2>

{/* click control frontend */}

            <h5 className="text-pretty font-bold text-2xl text-sky-700">My Favourites </h5>
           <div className="d-flex justify-content-center p-2 flex-wrap">
            {CBook && CBook.length>0 && 
            CBook.map(( item,index)=>{
                return(
                    //  key={item.id}
                    <div key={ item._id} className= 'card m-3 cursor-pointer text-center items-center p-2 font-medium text-black-900' >
                        {/* <AiOutlineHeart /> */}
                        <div onClick ={()=>handleLike(item._id)} className="icon-con">
                        <FaHeart className='icons' />
                        </div>
                        < img   width= "200px" height="100px" src= {'http://localhost:3000/' + item.bookimage}  />
                        

                        <p className="p-1">{item.bookname} | {item.bookcategory} </p>
                        <p className="p-1 text-success">{item.description}</p>
                        <p className="p-1 text-success">{item.bookprice}</p>
                        
                        
                    </div>)
                })}
                
            </div>
       
        <div className="d-flex justify-content-center p-2 flex-wrap">
            
            {Book && Book.length>0 && 
            Book.map(( item,index)=>{
            return(
                
                    //  key={item.id}
                    <div  onClick={() => handleProduct(item._id)} key={ item._id} className= 'card m-3 text-center items-center p-2 font-medium text-black-900' >
                                                {/* < FaRegHeart className="gap-2"/> */}
                                                <div onClick ={()=>handleLike(item._id)} className="icon-con">
                                                <FaHeart className='icons  ' />
                                                </div>

                        < img   width= "200px" height="100px" src= {'http://localhost:3000/' + item.bookimage}  />
                        
                        <p className="p-1">{item.bookname} | {item.bookcategory} </p>
                        <p className="p-1 text-success">{item.description}</p>
                        <p className="p-1 text-success">{item.bookprice}</p> 
                    </div>
                )
        })}   
            </div>

          
            
     
        </div>
    )
}
export default LikedBooks