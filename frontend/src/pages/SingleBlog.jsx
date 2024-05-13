import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";

import CommentReply from "../components/CommentReply";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetBlogsQuery } from "../slices/blogApiSlice";
import { useCreateCommentsMutation } from "../slices/CommentReplyApiSlice";
import ".././App.css";

import { MdThumbUpOffAlt ,MdThumbDownOffAlt, MdLogout } from "react-icons/md"

const SingleBlog = (props) => {
  const { userInfo, isLoadingUser } = useSelector((state) => state.auth);

  const { data: allBlogs, isError, isLoading } = useGetBlogsQuery() || {};

  const [newComment, setNewComment] = useState();

  const { id } = useParams();

  const navigate=useNavigate()

  const [createComments] = useCreateCommentsMutation() || {};
  let getBlog=[]
  getBlog = allBlogs?.filter((blogs) => blogs?._id?.includes(id));
//  const {createdAt,name,user}=getBlog?.map((a,b,c)=>a.createdAt,b.name,c.user)
const date=getBlog?.[0].createdAt

  const handleComment = async (e) => {
    if(newComment!=="" || newComment!==undefined){
      const commentData = {
        id,
        comment: newComment,
        userName: getBlog?.[0]?.name,
        userId: getBlog?.[0]?.user,
      };
  console.log(commentData);
      try {
        const res = await createComments(commentData);
      } catch (err) {
        console.log("singleBlog catch" + err?.data?.message || err);
      }
    }
  };
  const logoHandle = () => navigate("/allblogs");

  return (
    <>
      <div className="">
      <div className="container-fluid app__header">
        <div>
          <h3 className="logoBlog" style={{ cursor: "pointer" }} onClick={logoHandle}>Blog</h3>
        </div>
        

        {userInfo?.userName ? (
          // <div onClick={() => auth.signOut()}>Logout</div>
          <div className="app__loginContainer">
            <div style={{cursor:"pointer",margin: "2px", padding: "8px"}}>{userInfo.userName}</div>
            <div style={{cursor:"pointer",margin: "2px", padding: "8px"}}>Logout</div><span><MdLogout /></span>
          </div>
        ) : (
          <div className="app__loginContainer">
            {/* <div onClick={() => setOpen(true)}>Login</div>
            <div onClick={() => setRegisterOpen(true)}>Sign Up</div> */}
            <Link to={'/'} style={{cursor:"pointer",margin: "2px", padding: "8px"}}>Login</Link>
            <Link  to={'/register'} style={{cursor:"pointer",margin: "2px", padding: "8px"}}>Sign Up</Link>
          </div>
        )}
      </div>

        <div className=" container">
        <div className=" row">
        
          <div className="maxWidth d-flex  flex-column my-auto justify-content-center align-items-start">
            <div className="col-12 mb-1 mx-auto">
              <div className="mt-4 d-flex flex-column mx-auto justify-content-center align-items-center">
                <div className=" w-75 ">
                  <h2 className="poppin"> Title of {id}</h2>
                  <p className="poppin"style={{ color: "grey" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Debitis iusto eos at eaque eligendi quam, numquam voluptate
                    maxime perspiciatis accusantium? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Voluptates, ut.
                  </p>
                </div>
                <div className="d-flex w-75 justify-content-between">
                  <p
                    style={{
                      color: "grey",
                      padding: " 5px",
                      margin: "0px,2px,0px,2px",
                    }}
                  >
                    {new Date(date).toDateString()}
                  </p>
                  <p
                    style={{
                      color: "grey",
                      
                      padding: " 5px",
                      margin: "0px,2px,0px,2px",
                    }}
                  >
                    tags tags tags tags tags
                  </p>
                  
                  <p
                    style={{
                      color: "grey",
                      padding: " 5px",
                      margin: "0px,2px,0px,2px",
                    }}
                  >
                    <MdThumbUpOffAlt/> 250
                  </p>
                </div>
              </div>

              <div className=" col-12 w-75 mx-auto justify-content-center align-items-start">
                <div className=" w-100 mx-auto ">
                  <div className=" poppins my-2 align-self-start">Share you Thoughts</div>
                  <div className="form-group w-75 ">
                    {/* 
            
            d-flex  align-items-center align-self-center justify-content-start
            d-flex  align-items-center align-self-center justify-content-start
            <textarea
            
              className="form-control"
              styles={"resize:none" }           
              rows="1"
              
            ></textarea>
             <Form.Control
              className=""
              size="sm"
              type="text"
              placeholder="Comments"
            /> */}

                    <Form onSubmit={handleComment}>
                      <Form.Group className="my-2" controlId="email">
                        <textarea
                          value={newComment}
                          required
                          className="form-control"
                          styles={"resize:none"}
                          onChange={(e) => setNewComment(e.target.value)}
                          rows="2"
                        ></textarea>
                        <Button
                          className="my-2  border-0 btn btn-primary  border-0"
                          onClick={handleComment}
                        >
                          write comment
                        </Button>
                      </Form.Group>
                    </Form>
                  </div>
                </div>
                          <h3 className="mt-5 poppin">Comments and Replies</h3>
              {!getBlog?.[0]?.comments.length>0 &&<div className="mt-3 ms-1 poppin">No Comments yet.... Be the First one to comment.....</div>}
</div>

            </div>
            {!isError &&
              !isLoading &&
              getBlog?.[0]?.comments.map((data, index) => (
                <CommentReply key={index} commentData={data} />
              ))}
          </div>
          
        </div>
      </div>
      </div>
    </>
  );
};

export default SingleBlog;
