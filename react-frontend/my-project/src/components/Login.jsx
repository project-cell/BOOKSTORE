import React from 'react'
import { useState } from 'react';
import Header from './Header'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import API_URL from '../constants';
export default function Login() {
      const[loading,setLoading] =useState(false);
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();
      const handleApi=()=>
        {
          //  console.log({password,email})
           const url=API_URL+'/login'
           const data={password,email}
           axios.post(url,data).then((res)=>{
              //  console.log(res.data);
               if (res.data.message){
              alert(res.data.message)
              if(res.data.token){
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('userId',res.data.userId);
                navigate('/')
                
              }
               }  
           }).catch ((er)=>{
               console.log(er);
               alert('server error ')
           })
        }

//   return (
//     <div>
//         <Header />
//         welcome to login
// const handleSubmit= async(e)=>{
//     e.preventDefault();//no refreshing
//     try{
//       setLoading(true);
//       setError(false);
//       const res = await fetch('/backend/auth/signup',{
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       setLoading(false);
//       if(data.success==false){
//         setError(true);
//         return;
//       }    
//       navigate('/');

//     }catch(error){
//       setLoading(false);
//       setError(true);
//     }
//   }
return (
    <div>
        <Header />

    <div className='p-8 max-w-lg mx-auto gap-8 items-center '>

      <h1 className='text-4xl font-serif mt-4 text-center  text-rose-700 font-semibold gap-2'> Login
        
      </h1>
      <form 
      // onSubmit={handleSubmit} 
      className ='flex flex-col p-4 gap-6'>
        <input type="email" 
        placeholder='Email'
       
       // id='email' 
        className='bg-slate-200 p-3 rounded-lg'  
        value={email}  
        // onChange={handleChange}
        onChange={(e) => 
          // console.log(e.target.value)
      setEmail(e.target.value)}
        />

        <input
          type="password" 
          placeholder='Password'
          //id='password' 
          className='bg-slate-200 p-3 rounded-lg'
          value={password}
          // onChange={handleChange}
          onChange={(e) => 
            // console.log(e.target.value)
          setPassword(e.target.value)}
        />
         <button disabled={loading}  onClick={handleApi}
        className='bg-lime-200 text-black font-medium text-center p-3 rounded-lg uppercase hover:opacity-60 outline-lime-500 disabled:opacity-80 gap-4' >
        {loading?'Loading... ': 'Log In'} </button>
        
        </form>
        
        <div className='flex gap-2 '>
        <p className='text-pretty text-slate-950 font-medium text-right
        '> Already have an acoount?</p>
        <Link to="/signup" className='text-emerald-950 font-bold text-right'>
        <span className='text-violet-500 '>Sign up</span></Link>
        
      </div>
    </div>
    </div>
  )
}
