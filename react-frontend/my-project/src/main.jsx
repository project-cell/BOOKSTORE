//import { StrictMode } from 'react'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider,Route,Link} from "react-router-dom";
import './index.css'
import App from './App.jsx'
//import Header from "./components/header"
import Home from "./components/Home"
import About from "./components/About"
import Login from './components/Login';
import Signup from './components/Signup';
import Add_product from './components/Add_product';
import LikedBooks from './components/LikedBooks.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import CategoryPage from './components/CategoryPage.jsx';
import MyBooks from './components/MyBooks';
import MyProfile from './components/MyProfile.jsx';

const router = createBrowserRouter([
  {
  
  path: '/',
  element: (<Home/>
  ),
},
{
  path: "/Login",
  element: (<Login/>),
},
{
path: "/About",
element: (<About/>)
},

{
  path: "/Signup",
  element: (<Signup/>)
  
},
{
  path: "/Add_product",
  element: (<Add_product/>)
},
{
  path: "LikedBooks",
  element: (<LikedBooks/>)
},
{
  path: "MyBooks",
  element: (<MyBooks/>)
},
{
  path: "/ProductDetail/:id",
  // id is param
  element: (<ProductDetail/>)
},
{
  path: "/CategoryPage/:catName",
  element: (<CategoryPage/>)
},

{
  path: "/MyProfile",
  element: (<MyProfile/>)
},
])
createRoot(document.getElementById("root")).render(
  <RouterProvider router= {router} />
);


