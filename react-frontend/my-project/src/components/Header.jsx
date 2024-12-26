import './header.css'
import { Link ,useNavigate} from 'react-router-dom';
import { FcSearch } from 'react-icons/fc'
import { useState } from 'react';
// import { GiSunflower } from 'react-icons/gi'
// import { RiStarSmileFill } from 'react-icons/ri'
function Header(props){
    const navigate = useNavigate();
    const [loc ,setloc] = useState(null)
    // const [showOver,setshowOver] = useState(false)
    const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
        navigate('/login')
	};

    let locations =[{
        "latitude": 28.6139,
        "longitude": 77.2090,
        "placeName": "New Delhi, Delhi"
    },
    {
        "latitude": 12.9716,
        "longitude": 77.5946,
        "placeName": "Bangalore, Karnataka"
    },
    {
        "latitude": 19.0759,
        "longitude": 72.8777,
        "placeName": "Mumbai, Maharashtra"
    },
    {
        "latitude": 23.2697,
        "longitude": 77.5946,
        "placeName": "Bhopal, Madhya Pradesh"
    },
    {
        "latitude": 18.5204,
        "longitude": 73.8567,
        "placeName": "Pune, Maharashtra"
    },
    {
        "latitude": 25.3966,
        "longitude": 81.8536,
        "placeName": "Lucknow, Uttar Pradesh"
    },
    {
        "latitude": 26.2078464,
        "longitude": 80.2999999,
        "placeName": "Kanpur, Uttar Pradesh"
    },
    {
        "latitude": 25.42012,
        "longitude": 81.88385,
        "placeName": "Pryagraj, Uttar Pradesh"
        },
]

    return (
        
         <div className='header  bg-violet-300 bg-opacity-50 backdrop-filter backdrop-blur-xl shadow-xl bg-gradient-to-t from-blue-300 to-pink-200
    overflow-hidden '>     
    
    <h1 className=' text-center items-center font-bold  text-lg font-sans italic  bg-gradient-to-r  from-blue-700 to-indigo-950 text text-transparent bg-clip-text'> Pages that connect, futures that reflect! A Handy BookStore 
        
    </h1>
            <div className="  flex justify-items-center gap-4 items-center max-w-6xl mx-auto p-2" >
            {/* <h1 className=' text-left place-items-start font-medium  bg-gradient-to-r from-teal-700 to-pink-700 text-transparent bg-clip-text'> Pages that connect, futures that reflect! A Handy BookStore</h1> */}
                <Link to ='/'> 
                 <h1 className=' text-left place-items-start font-bold text-lg bg-gradient-to-r from-teal-700 to-pink-700  text-transparent bg-clip-text'>Home </h1>
                </Link>
                

                <select value={loc} onChange={(e)=>{
                    localStorage.setItem('userLoc',e.target.value)
                    setloc(e.target.value)
                }} className='  gap-2 border-solid border-2 rounded border-black bg-gray-100 pl-2 pr-2 w-19 h-8'>
                    {
                        locations.map((item, index) =>{

                            return(
                                <option 
                                
                                value={`${item.latitude},${item.longitude}`} >
                                    {item.placeName}
                                </option>
                            )
                        })
                    }
                </select>


                 <input 
                className=" gap-2 p-2  border-solid border-2 rounded border-black bg-gray-100 pl-2 pr-2 w-25 h-8"
                type="text" 
                value={props && props.search}
                onChange={(e)=> props.handlesearch && props.handlesearch(e.target.value)
                }
             />
            <button className=" search-btn mr-auto shadow-md  h-6 border-none bg-purple-300 pr-3 ml-0 pl-3 text-teal-700 " onClick={ () =>props.handleClick && props.handleClick()}>
                 <FcSearch/>
                 </button>
                {/* <input type="text"/> */}
                    <ul className='flex gap-4 text-justify font-semibold '>
                    <Link to='/About'><li className='font-serif '>About</li></Link> 
                    <Link to='/signup'><li className='font-serif '>Signup</li></Link>
                { !localStorage.getItem ('token')?
                <Link to='/login'><li className='font-serif'>Login</li></Link> :
                <button onClick={handleLogout} className='font-serif'>Logout</button>
                }
                
                </ul>  
                {/* <div
                onClick={()=>{
                    setshowOver(true)
                }}
                className=' items-center bg-gradient-to-t border-2 border-teal-950 from-blue-200 to-pink-200 ' style={{ display:'flex',justifyContent:'center',width:'50px',height:'30px',borderRadius:'50%'}}>h</div>
               {showOver && 
                <div className=' items-center bg-gradient-to-t border-2 border-teal-950 from-blue-200 to-pink-200 w-40 ' style={{ display:'flex',justifyContent:'center'}}>
                    { !!localStorage.getItem('token')&&<Link className="links" to="/LikedBooks"><button className=""> Liked Books </button></Link>}
                </div> }  */}
            </div>
        </div>
                     
                              
            

            

        );
}
export default Header;
