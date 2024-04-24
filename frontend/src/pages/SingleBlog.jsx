import React from "react";

import BlogCard from "../components/BlogCard";
import CommentReply from "../components/CommentReply";
import { useLocation, useParams } from "react-router-dom";
function SingleBlog(props) {
  const {id}=useParams();
console.log(id)
 
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="d-flex flex-column my-auto justify-content-center align-items-start">
          <div className='col-12 mb-5' >
      <div className="d-flex flex-column w-75 mx-auto justify-content-center align-items-start">
         <h2   >  Title of {id}</h2>
        <p style={{color:"grey"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis iusto eos at eaque eligendi quam, numquam voluptate maxime perspiciatis accusantium? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ut.</p>
        <div className="d-flex w-75 justify-content-between">
        <p style={{color:"grey", padding:" 5px",margin:"0px,2px,0px,2px"}}>Date</p>
        <p style={{color:"grey",fontStyle:"italic",padding:" 5px",margin:"0px,2px,0px,2px"}}>tags tags tags tags tags </p>
        <p style={{color:"grey",padding:" 5px",margin:"0px,2px,0px,2px"}}>comments</p>
        <p style={{color:"grey",padding:" 5px",margin:"0px,2px,0px,2px"}}>views</p> 

        
     </div>
    </div>
    </div>
            <CommentReply />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleBlog;
