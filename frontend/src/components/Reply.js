import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDeleteReplyMutation, useUpdateReplyMutation } from "../slices/CommentReplyApiSlice";
import { VscEdit } from "react-icons/vsc";

import {
  MdOutlineEdit,
  MdDeleteOutline,
  MdOutlineModeComment,
  MdSend,
  MdCancelScheduleSend,
} from "react-icons/md";
import Confirm from "./ui/Confirm";

const Reply = ({ rply, alldata }) => {
  const { createdAt, name } = alldata.replies;

  const [showReply, setShowReply] = useState("false");
  const [replyValue, setReplyValue] = useState("");
  const [showModal,setShowModal]=useState(false)

  const toggleReply = async () => {
    setShowReply((showEdit) => !showEdit);
    setReplyValue(rply.reply);
  };
  const [updateReply] = useUpdateReplyMutation();
  const [deleteReply] = useDeleteReplyMutation();


  const toggleRply = () => {
    setShowReply((showEdit) => !showEdit);
  };
  const replyEditSubmitHandler = async () => {
    try {
      const updatedValue = {
        reply: replyValue,
        postId: alldata?.postId,
        commentId: rply?.commentId,
        replyId: rply?._id,
        replyBy: rply?.replied_By,
        name: rply?.name,
      };

      const res = await updateReply(updatedValue);
      console.log(res);
    } catch (err) {
      console.log("singleBlog catch" + err?.data?.message || err);
    }
    setShowReply((showEdit) => !showEdit);
  };
  
  const deleteHandler=async()=>{
    setShowModal(true)
      }
    
      const handleCancel = () =>    setShowModal(false);
     const handleDelete = async() => {
       
       const deletedata={
      name:rply.name,
      postId:alldata.postId, 
      commentId:rply.commentId,
      replied_By:rply.replied_By, 
      replyId:rply._id,
      reply:rply.reply
    }
    console.log(deletedata)
    // try {
    //   await deleteReply(deletedata)
    // } catch (err) {
    //   console.log("singleBlog delete reply catch" + err?.data?.message || err)
    // }
    setShowModal(false)
  } 
  return (
    <>
{showModal && <Confirm showModal={showModal} handleCancel ={handleCancel} handleDelete={handleDelete}/>}

      <div className=" ml-5 mt-2 d-flex w-75 flex-direction-row justify-content-between ">
        <div className="   d-flex w-75 flex-direction-row  justify-content-start align-items-center ">
          <img style={{ height: 15, width: 15 }} src="/favicon.ico" alt="" />
          <div style={{ marginLeft: "5px" }}>{rply.name}</div>

          <div
            className={`"w-25" ${!showReply ? "d-none" : ""}`}
            style={{ fontSize: "12px", marginLeft: "5px" }}
          >
            {new Date(rply.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className=" d-flex flex-row  justify-content-end align-items-center">
          <div className="" onClick={toggleReply}>
            <VscEdit />
          </div>
          <div onClick={deleteHandler}>
            <MdDeleteOutline />
          </div>
          <div
            className={`d-flex flex-row align-items-center my-3 w-50 ms-2 ${
              showReply ? "d-none" : ""
            } `}
          ></div>
        </div>
      </div>
      <div
        style={{ marginLeft: "5px" }}
        className={`w-75 ${!showReply ? "d-none" : ""}`}
      >
        {rply?.reply}
      </div>
      <div className="d-flex w-75">
        <div className={`w-100 ${showReply ? "d-none" : ""}`}>
          <input
            className="  w-50"
            rows="1"
            value={replyValue}
            onChange={(e) => setReplyValue(e.target.value)}
          />

          <Button
            className="mx-2  border-0 btn btn-primary  border-0"
            onClick={replyEditSubmitHandler}
          >
            <MdSend />
          </Button>
          <Button
            className="  border-0 btn btn-danger  border-0"
            onClick={toggleRply}
          >
            <MdCancelScheduleSend />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Reply;
