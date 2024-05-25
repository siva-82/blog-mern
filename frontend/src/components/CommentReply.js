import React, { useState } from "react";
import Confirm from "./ui/Confirm";
import Reply from "./Reply";
import { toast } from "react-toastify";
import {
  useCreateReplyMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useDeleteReplyMutation
} from "../slices/CommentReplyApiSlice";

import { Button,  Form, Row } from "react-bootstrap";
import ".././App.css";
import { VscEdit } from "react-icons/vsc";
import {MdThumbUpOffAlt ,MdThumbDownOffAlt ,MdDeleteOutline ,MdOutlineModeComment,MdSend,MdCancelScheduleSend    } from "react-icons/md"
import { useSelector } from "react-redux";


const CommentReply = ({ commentData }) => {

  const { userInfo, isLoadingUser } = useSelector((state) => state.auth);

  const { name, createdAt } = commentData;
  const userComment = commentData.comment;
  const [show, setShow] = useState("false");
  const [showModal,setShowModal]=useState(false)
  const [showEdit, setShowEdit] = useState("false");
  const [editValue, setEditValue] = useState("");
  const [newReply, setNewReply] = useState("");
  const [showReplyInput, setShowReplyInput] = useState("false");

  const [updateComment] = useUpdateCommentMutation();
  const [createReply] = useCreateReplyMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [newComment, setNewComment] = useState();
  
  
  const toggle = () => {
    setShow((show) => !show);
  };
  const toggleReply = () => {
    setShowReplyInput((showReplyInput) => !showReplyInput);
  };
  const toggleEdit = async () => {
    setShowEdit((showEdit) => !showEdit);
    setEditValue(userComment);
  };
  const commentEditSubmitHandler = async () => {
    try {
      const updatedValue = {
        comment: editValue,
        postId: commentData?.postId,
        commentId: commentData?._id,
      };
      let res = await updateComment(updatedValue);
      toast.success(res.message)
    } catch (err) {
      toast.error( err?.data?.message || err);
    }
    setShowEdit((showEdit) => !showEdit);
  };
  

  const replySubmitHandler = async () => {
    try {
      const updatedValue = {
        postId: commentData?.postId,
        commentId: commentData?._id,
        replied_By: commentData?.comment_By,
        name: commentData?.name,
        reply: newReply,
      };

      const res = await createReply(updatedValue);
   
      toast.success(res.data)

    } catch (err) {
      console.log("singleBlog catch" + err?.data?.message || err);
    }
    setNewReply("");
    setShow((show) => !show);
  };
  
    
  
  // const deleteHandler=async()=>{
  //   try {
   
  //     const deletedata={
  //       postId:commentData.postId, 
  //       comment_By:commentData.comment_By,
  //       userId: commentData.comment_By,
  //       name: commentData?.name,
  //       commentId:commentData._id,
  //       comment:commentData.comment,
  //     }
  //     console.log("commentData")
  //  console.log(commentData)
     
  //       const res =await deleteComment(deletedata).unwrap()
  //       console.log(res)
  //       toast.success(res.message)
  //     } catch (err) {
  //       console.log("singleBlog delete catch" + err?.data?.message || err)
  //     }
  //   setShowModal(false)
  // }

  const handleCancel = () =>    setShowModal(false);
 const handleDelete = async() => {
  try {
   
    const deletedata={
      postId:commentData.postId, 
      comment_By:commentData.comment_By,
      userId: commentData.comment_By,
      name: commentData?.name,
      commentId:commentData._id,
      comment:commentData.comment,
    }
    console.log("commentData")
 console.log(commentData)
   
      const res =await deleteComment(deletedata).unwrap()
      console.log(res)
      toast.success(res.message)
    } catch (err) {
      console.log("singleBlog delete catch" + err?.data?.message || err)
    }
   setShowModal(false);} 
  return (
    <>
    
      <div className=" maxWidth  my-4 w-75 mx-auto comment__card ">
        <div className="w-100"> 
        <div className=" ms-2 my-3 d-flex flex-direction-row justify-content-between ">
          <div className="   d-flex  flex-direction-row  justify-content-between align-items-center ">
            <img style={{ height: 20, width: 20,borderRadius:50 }} src="/favicon.ico" alt="" />
            <div style={{ marginLeft: "5px" }}>{name}</div>
            <div className="mq-date" style={{ marginLeft: "5px" }}>
              {new Date(createdAt).toDateString()}
            </div>
          </div>
          <div className=" d-flex flex-row  justify-content-end align-items-center">
            <Button style={{ cursor:"pointer"}}className=" mq-btn btn btn-primary" onClick={toggleEdit}>
              <VscEdit/>
            </Button>
            <Button style={{ marginLeft: "5px" }} className="mq-btn btn btn-danger" onClick={()=>setShowModal(true)}><MdDeleteOutline /></Button>
          </div>
        </div>
        
        <div className={`my-3 w-75 ms-2 ${!showEdit ? "d-none" : ""}`}>
          {userComment}
        </div>

        <div
          className={`d-flex flex-row align-items-center my-3 w-50 ms-2 ${
            showEdit ? "d-none" : ""
          } `}
        >
          <div className="  w-100">
          
            <input
              className="  w-100"
              rows="1"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
          </div>
          <Button
            className="mx-2 mq-btn  border-0 btn btn-primary  border-0"
            onClick={commentEditSubmitHandler}
          >
            <MdSend />
          </Button>
          <Button
            className="mq-btn border-0 btn btn-danger  border-0"
            onClick={toggleEdit}
          >
            <MdCancelScheduleSend   />
          </Button>
        </div>
{showModal && <Confirm showModal={showModal} data={"Comment"} handleCancel ={handleCancel} handleDelete={handleDelete}/>}
        <div className=" d-flex w-75  flex-direction-row justify-content-start ">
          <div className=" d-flex flex-direction-row justify-content-between align-items-center ">
            {/* <div className="mx-2">Likes</div> <div className="mx-2">shares</div> */}
            <div
              className="mx-2 border-0  btn-primary  border-0"
              onClick={toggle}
            >{<MdOutlineModeComment />}
              {show ? " Reply" : " Hide"}
            </div>
          </div>
          {!show && (
            <div className="  w-75  ">
              <div className="form-group d-flex flex-direction-row justify-content-between ">
                <Form.Control
                  className=""
                  size="sm"
                  type="text"
                  placeholder="Reply"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                />
                <Button
                  onClick={replySubmitHandler}
                  className="ms-2 w-50  border-0 btn btn-primary  border-0"
                >
                  send
                </Button>
              </div>
            </div>
          )}
        </div>

        <div
          className={`my-3 ms-2 ${commentData.replies.length == 0 ? "d-none" : ""}`}
          onClick={toggleReply}  style={{ cursor:"pointer"}}
        >
          <span style={{ marginLeft: "5px" }}><MdThumbUpOffAlt/> {250}</span>
          <span style={{ marginLeft: "5px" }}><MdThumbDownOffAlt/>{50}</span>
          <span style={{ marginLeft: "5px" }}><MdOutlineModeComment/></span>
          <button className="show_reply ">{showReplyInput ?"Show Replies":"Hide Replies"}</button>
        </div>
        {!showReplyInput &&
          commentData.replies.map((rply, index) => (
            <div key={index} className="  w-100 ">
              <div className="ms-5 mt-2  d-flex flex-column mx-auto justify-content-center align-items-center ">
                <Reply rply={rply} alldata={commentData} />
              </div>
            </div>
          ))}
      </div>
      </div>
    </>
  );
};

export default CommentReply;
