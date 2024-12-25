import './header.css'
import categories from './categories';
import { useNavigate,Link } from "react-router-dom"

function Categories(props){
    const navigate = useNavigate();
  
    return (
        //  bg-violet-300 bg-opacity-50 backdrop-filter backdrop-blur-xl shadow-xl overflow-hidden 
       
         <div className='rounded shadow-md h-16 bg-gray-200 cat-container text-xl text-rose-600 font-bold'> 
    <span >All Categories
    </span>
    {/*  */}
    <div>
        {categories && categories.length >0 && categories.map((item,index) => {
            return (
                <span onClick={()=> navigate('/CategoryPage/' + item)} key={index} className='category text-pretty mt-1 font-sans font-semibold text-base text-emerald-700 ml-3'>{item}| </span>
            )

        })}
        </div>     
        </div>    
     
        );
}
export default Categories;
