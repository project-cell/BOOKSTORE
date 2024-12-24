import React from 'react'
import { useState } from 'react';
import Header from './Header'
import { useNavigate,Link } from "react-router-dom"
import axios from 'axios';// for backend connection
export default function Signup() {
    const navigate = useNavigate();
    const [username, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mobile, setmobile] = useState("");
    const [countryCode, setCountryCode] = useState('+91'); // Default country code
    // const[loading,setLoading] =useState(false);
    // const[error,setError] =useState(null);
    const handleApi=()=>
         {
            // console.log({username,password,email})
            const url='http://localhost:3000/signup'
            const data={username,password,email,mobile}
            axios.post(url,data).then((res)=>{
                // console.log(res.data);
                if (res.data.message){
                    alert(res.data.message)
                    
                }
            }).catch ((er)=>{
                // console.log(er);
                alert('server error ')
            })
            navigate('/');
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

const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
};

const handleMobileChange = (e) => {
    // Ensure that the input only contains numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setmobile(value);
};
return (
    <div>
        <Header />

    <div className='p-8 max-w-lg mx-auto gap-8 items-center '>
      <h1 className='text-4xl font-serif mt-4 text-center  text-rose-700 font-semibold gap-2'> Sign-Up</h1>
      {/* <form onSubmit={handleSubmit} className ='flex flex-col p-4 gap-6'> */}
      <form  className ='flex flex-col p-4 gap-6'>
      <input
            type = "text"
            placeholder = 'Username'
            //id='username' 
            className='bg-slate-200 p-3 rounded-lg' 
            value={username}
            onChange={(e) => 
                // console.log(e.target.value)
            setName(e.target.value)}
        />

        <input 
            type="email" 
            placeholder='Email'
            //id='email' 
            className='bg-slate-200 p-3 rounded-lg'  
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            // onChange={handleChange} 
        />

        <input
            type="password" 
            placeholder='Password'
            //id='password' 
            className='bg-slate-200 p-3 rounded-lg'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // onChange={handleChange}
        />
        <div className="flex items-center bg-slate-200 p-2 rounded-lg">
            <select
                value={countryCode}
                onChange={handleCountryCodeChange}
                className="bg-slate-200 p-1 rounded-lg mr-2"
            >
                <option value="+91">+91 (India)</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (Australia)</option>
                {/* Add more country codes as needed */}
            </select>

        <input
            type="tel" 
            placeholder='Mobile No.'
            //id='password' 
            className='bg-slate-200 p-2 rounded-lg'
            value={mobile}
            // onChange={(e) => setmobile(e.target.value)}
            onChange={handleMobileChange}

            maxLength={10} // Adjust based on your requirements

            // onChange={handleChange}
        />
        </div>
        <button 
        //  disabled={loading}
            onClick={handleApi}
            className='bg-lime-200 text-black font-medium text-center p-3 rounded-lg uppercase hover:opacity-60 outline-lime-500 disabled:opacity-80 gap-4' >
            Sign-Up
            {/* {loading?'Loading... ': 'Sign Up'} */}
         </button>
        {/* </form> */}
        </form>  
        <div className='flex gap-2 '>
        <p className='text-pretty text-slate-950 font-medium text-right'> Already have an acoount</p>
        <Link to="/Login" className='text-emerald-950 font-bold text-right'>
        <span className='text-violet-500 '>Login  </span></Link>
        
      </div>
    </div>
    </div>
  )
}
