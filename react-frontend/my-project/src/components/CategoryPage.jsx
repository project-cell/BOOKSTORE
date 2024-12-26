import React,{ useEffect,useState } from "react"
import Header from "./Header.jsx"
import { useNavigate,Link, useParams } from "react-router-dom"
import axios from "axios";
import Categories from "./Categories.jsx";
// import { AiOutlineHeart } from "react-icons/ai";
// import { FaBeer } from "react-icons/fa";
// import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa'
import './Home.css'
import { GrClearOption } from 'react-icons/gr'
import API_URL from "../constants.js";
function CategoryPage(){
    const navigate = useNavigate();
    const param = useParams()
    console.log(param)
    const [Book, setBook] = useState([]);
    const [CBook, setCBook] = useState([]);
    const [search, setsearch] = useState('');
    const [issearch, setissearch] = useState(false);


    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')

        }
    },[])

    useEffect(()=>{
        const url = API_URL + '/get-books?catName=' + param.catName;
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

    },[param])

    //useEffect is a hook that allows you to run some side effect after rendering the component
    const handlesearch=(value)=>{
        setsearch(value);
    }
    const handleClick=()=>{
        // console.log('clicked')
        // console.log('Book',Book)
        // const url = 'http://localhost:3000/search?search=' + search;
        const userLoc = localStorage.getItem('userLoc');
        const url = API_URL +'/search?search=' + search + '&loc=' + userLoc;
        axios.get(url)
        .then((res)=>{
            setCBook(res.data.Book)
            setissearch(true)
            
              // console.log(res.data)
        }).catch((er)=>{
        alert('something went wrong')
          })
                // let filteredBooks =Book.filter((item)=>{
                //     // console.log(item)
                //     if(item.bookname.toLowerCase().includes(search) ||
                //     item.description.toLowerCase().includes(search)||
                //     item.bookcategory.toLowerCase().includes(search))
                //         {
                //         return item;
                //         }
                // });
                // setCBook(filteredBooks)
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
            const url = API_URL+'/like-book'
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
            <div className=" h-screen bg-gradient-to-t from-blue-300 to-pink-200">
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick}/> 
            
          <div className=' p-1.5 z-20 via-slate-500 font-semibold bg-purple-200 bg-opacity-100 backdrop-filter backdrop-blur-xl shadow-gray-950 justify-center overflow-hidden '> 
          <ul className='flex text-center gap-4 ml-7 text-clip font-semibold items-center'>
               {/* <ul className='flex gap-4 text-clip font-semibold '> */}
            { !!localStorage.getItem('token')&&<Link className="links" to="/Add_product"><button className=""> Add Books </button></Link>}
            { !!localStorage.getItem('token')&&<Link className="links" to="/LikedBooks"><button className=""> Liked Books </button></Link>}
           </ul>
           </div>
           <Categories handleCategory={handleCategory}/>
           <h2 className="text-center underline text-3xl p-3 text-teal-700 font-bold font-serif" >
             Library at your Fingertips: </h2>

{/* click control frontend */}

           {issearch && CBook &&<h5 className="text-pretty font-bold  text-2xl text-sky-700 "> Searched Results: :Clear Results:
            
                <button className="search-btn mr-6 gap-20 h-6 border-none mb-2 bg-lime-200 pr-3 ml-6 pl-3  text-teal-700 " onClick={()=> setissearch(false)}> <GrClearOption className=""/>
                </button>
            
            </h5>}
           {issearch && CBook && CBook.length == 0 && <h5 className="text-pretty font-bold text-2xl text-sky-700"> No Results Found</h5>}
          {issearch && <div className="d-flex justify-content-center p-2 flex-wrap">
            {CBook && CBook.length>0 && 
            CBook.map(( item,index)=>{ 
                return(
                    //  key={item.id}
                    <div     key={ item._id} className= 'card m-3 text-center items-center p-2 font-medium text-black-900' >
                        {/* <AiOutlineHeart /> */}
                        <div onClick ={()=>handleLike(item._id)} className="icon-con">
                        <FaHeart className='icons' />
                        </div>
                        < img   width= "200px" height="100px" src= { API_URL + '/' + item.bookimage}  />
                        

                        <p className="p-1">{item.bookname} | {item.bookcategory} </p>
                        <p className="p-1 text-success">{item.description}</p>
                        <p className="p-1 text-success">{item.bookprice}</p>
                        
                        
                    </div>)
                })}
                
            </div>}
        {/* <h5 className="text-pretty font-bold text-2xl text-sky-700">All Results</h5>  */}
         {!issearch && <div className="d-flex justify-content-center p-2 flex-wrap">
            
            {Book && Book.length>0 && 
            Book.map(( item,index)=>{
            return(
                
                    //  key={item.id}
                    <div onClick={() => handleProduct(item._id)} key={ item._id} className= 'card m-3 cursor-pointer text-center items-center p-2 font-medium text-black-900' >
                                                {/* < FaRegHeart className="gap-2"/> */}
                                                <div onClick ={()=>handleLike(item._id)} className="icon-con">
                                                <FaHeart className='icons  ' />
                                                </div>

                        < img   width= "200px" height="100px" src= { API_URL + '/' + item.bookimage}  />
                        
                        <p className="p-1">{item.bookname} | {item.bookcategory} </p>
                        <p className="p-1 text-success">{item.description}</p>
                        <p className="p-1 text-success">{item.bookprice}</p> 
                    </div>
                )
        })}   
            </div>}

          
            
     </div>
        </div>
    )
}
export default CategoryPage