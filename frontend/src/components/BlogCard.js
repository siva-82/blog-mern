import React from 'react'
import { Link } from "react-router-dom";

const BlogCard = ({blog}) => {

const {title,datecreatedAt,updatedAt,description}=blog

var date = new Date(updatedAt)

// console.log(date.getDate() +  " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear())
  return (
    <div className='col-12 mb-5' >
      <div className="d-flex flex-column w-75 mx-auto justify-content-center align-items-start">
         <Link to={{ pathname: `/SingleBlog/${blog._id}` }}  style={{color:"blue", textDecorationLine:"none"}} >  {description +" created on "+ date.toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'}) }</Link>
        <p style={{color:"grey"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis iusto eos at eaque eligendi quam, numquam voluptate maxime perspiciatis accusantium? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ut.{description}</p>
        <div className="d-flex w-75 justify-content-between">
        <p style={{color:"grey", padding:" 5px",margin:"0px,2px,0px,2px"}}>{date.toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'})}</p>
        <p style={{color:"grey",padding:" 5px",margin:"0px,2px,0px,2px"}}>tags tags tags tags tags </p>
        <p style={{color:"grey",padding:" 5px",margin:"0px,2px,0px,2px"}}>comments</p>
        <p style={{color:"grey",padding:" 5px",margin:"0px,2px,0px,2px"}}>likes</p> 
        <p style={{color:"grey",padding:" 5px",margin:"0px,2px,0px,2px"}}>views</p> 

        
     </div>
    </div>
    
    </div>
  )
}

export default BlogCard