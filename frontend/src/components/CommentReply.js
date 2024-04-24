import React, { useState } from 'react'

const CommentReply = () => {
  const [show,setShow]=useState("false")

  const toggle=()=>{
setShow((show)=>!show)
  }
  return (
   <>
   <div className="d-flex flex-column w-75 mx-auto my-20 justify-content-center align-items-start">CommentReply
   <div>
    <p>Comment</p>
    {!show && <div > 
      <div>
        <input ></input>
      </div>
      <p>Reply</p> </div>}
    
    <button onClick={toggle}> {show ?"Replies":"Hide"} </button>
   </div>
   </div>
   
   </> 
  )
}

export default CommentReply