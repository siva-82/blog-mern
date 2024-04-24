
import "bootstrap/dist/css/bootstrap.min.css";
import BlogCard from '../components/BlogCard';

import React, { useEffect, useState } from 'react'
import {  useGetBlogsQuery, useGetPaginatedBlogsQuery } from "../slices/blogApiSlice";
import PaginationContainer from "../components/ui/PaginationContainer";
import { useSelector } from "react-redux";


const AllBlogs = () => {


const [blogs,setBlogs]=useState([])
const [currentPage,setCurrentPage]=useState(3)
const [blogsPerPage]=useState(3)

// const {pageNumber}=useSelector((state)=>state?.blog)

  // const {data:paginatedblogs,isError,isLoading}=useGetPaginatedBlogsQuery(Number(pageNumber))||{}
  const {data:allBlogs,isError,isLoading}=useGetBlogsQuery()||{}

 
 const indexOfLastPost = currentPage * blogsPerPage;
 const indexOfFirtsPost=indexOfLastPost - blogsPerPage;
 const currentBlogs=allBlogs?.slice(indexOfFirtsPost , indexOfLastPost);
// console.log(indexOfLastPost,indexOfFirtsPost,currentBlogs)
 const paginate=(pageNumber)=>setCurrentPage(pageNumber)

  return (
    <>
   
     <div className="app__header">
    <h3>Blog</h3>
    </div>
    <div className="container">
      <div className="row">
        <div className="searchbar d-flex flex-column mt-5 mb-5  w-75 mx-auto justify-content-center align-items-start" >
          Search bar
        </div>
      </div>
      <div className="row">
        <div className="blogs">
        {!isLoading &&
          currentBlogs?.slice(0)?.map((blog) => ( 
            <>
            <BlogCard blog={blog}/>
            </>
           ))}
          

        </div>
        
  
        <div>
          <PaginationContainer currentPage={currentPage}blogsPerPage={blogsPerPage} totalBlogs={allBlogs?.length} paginate={paginate}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default AllBlogs