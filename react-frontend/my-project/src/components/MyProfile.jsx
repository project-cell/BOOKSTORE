import React, { useEffect,useState } from 'react'
// import React,{ useEffect,useState } from "react"
import Header from "./Header.jsx"
import axios from 'axios';
import API_URL from '../constants.js';


export default function MyProfile() {

       const[user,setuser]= useState({})
        useEffect(()=>{
            let url = API_URL + '/my-profile/'+ localStorage.getItem('userId');
            axios.get(url)
            .then((res)=>{
            // setCBook(res.data.Book)
             console.log(res.data)
             if(res.data.user){
                setuser(res.data.user)
             }
        //    setissearch(true)
        }).catch((er)=>{
        alert('something went wrong')
          })


        },[])
  return (
    <div >
        <Header /> 

<div className=" bg-gradient-to-t h-screen w-full from-blue-300 to-pink-200  ">
<div className="text-center  text-3xl p-3 font-bold  text-blue-500 ">
            My Profile
            </div>
            <div className="flex flex-col items-center justify-center  w-full ">
    <table className="items-center shadow-md sm:rounded-lg h-28 table-auto text-sm text-left rtl:text-right text-gray-700 dark:text-gray-900">
        <thead className="text-xs text-center  text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr className=''> 
                <th scope="col" class="px-6 py-3">
                    User Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Contact
                </th>
           
            </tr>
        </thead>
        <tbody>
            <tr className=" text-center  bg-rose-100 border-b dark:bg-gray-800 dark:border-gray-700"> 
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
            </tr>
        </tbody>
    </table>
    </div>
</div>
    </div>
)}
