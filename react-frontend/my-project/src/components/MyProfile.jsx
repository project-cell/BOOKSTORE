import React, { useEffect,useState } from 'react'
// import React,{ useEffect,useState } from "react"
import Header from "./Header.jsx"
import axios from 'axios';


export default function MyProfile() {

       const[user,setuser]= useState({})





        useEffect(()=>{
            let url = 'http://localhost:3000/my-profile/'+ localStorage.getItem('userId');
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

<div className="  ml-20 p-10">
<div className="text-center text-3xl p-3 font-bold italic mr-28 text-blue-500 ">
            My Profile
            </div>
    <table className="ml-96 place-items-center shadow-md sm:rounded-lg h-28 table-auto text-sm text-left rtl:text-right text-gray-700 dark:text-gray-900">
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

        {/* <div className=" m-3 p-3">
            <div className="text-center p-3 text-xl font-bold italic text-blue-500 ">
            MyProfile
            </div>
       <div >
       <table className="table-auto border-lime-100 " >
        <tr>
            <td>Username:</td>
            <td>Email Id:</td>
            <td>Contact Details:</td>
        

            </tr>
            <tr>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
            </tr>
       </table>
       </div>  
       </div> */}


    </div>
  )
}
