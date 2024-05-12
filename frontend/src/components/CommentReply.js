import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import Reply from "./Reply";
import ".././App.css";
import { VscEdit } from "react-icons/vsc";
import {MdThumbUpOffAlt ,MdThumbDownOffAlt , MdOutlineEdit,MdDeleteOutline ,MdOutlineModeComment,MdSend,MdCancelScheduleSend    } from "react-icons/md"
import {
  useCreateReplyMutation,
  useUpdateCommentMutation,
} from "../slices/CommentReplyApiSlice";

const CommentReply = ({ commentData }) => {


  const { name, createdAt } = commentData;
  const userComment = commentData.comment;
  const [show, setShow] = useState("false");
  const [showEdit, setShowEdit] = useState("false");
  const [editValue, setEditValue] = useState("");
  const [newReply, setNewReply] = useState("");
  const [showReplyInput, setShowReplyInput] = useState("false");

  const [updateComment] = useUpdateCommentMutation();
  const [createReply] = useCreateReplyMutation();
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
      const res = await updateComment(updatedValue);
      console.log(res);
    } catch (err) {
      console.log("singleBlog catch" + err?.data?.message || err);
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
    } catch (err) {
      console.log("singleBlog catch" + err?.data?.message || err);
    }
    setNewReply("");
    setShow((show) => !show);
  };
  return (
    <>
    
      <div className=" maxWidth  my-4 w-75 mx-auto comment__card ">
        <div className="w-100"> 
        <div className=" ms-2 my-3 d-flex flex-direction-row justify-content-between ">
          <div className="   d-flex  flex-direction-row  justify-content-between align-items-center ">
            <img style={{ height: 20, width: 20,borderRadius:50 }} src="/favicon.ico" alt="" />
            <div style={{ marginLeft: "5px" }}>{name}</div>
            <div style={{ marginLeft: "5px" }}>
              {new Date(createdAt).toDateString()}
            </div>
          </div>
          <div className=" d-flex flex-row  justify-content-end align-items-center">
            <Button style={{ cursor:"pointer"}}className="btn btn-primary" onClick={toggleEdit}>
              <span>{<VscEdit/>}</span>
            </Button>
            <Button style={{ marginLeft: "5px" }} className="btn btn-danger"><MdDeleteOutline /></Button>
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
            className="mx-2  border-0 btn btn-primary  border-0"
            onClick={commentEditSubmitHandler}
          >
            <MdSend />
          </Button>
          <Button
            className=" border-0 btn btn-danger  border-0"
            onClick={toggleEdit}
          >
            <MdCancelScheduleSend   />
          </Button>
        </div>

        <div className=" d-flex w-75  flex-direction-row justify-content-start ">
          <div className=" d-flex flex-direction-row justify-content-between ">
            {/* <div className="mx-2">Likes</div> <div className="mx-2">shares</div> */}
            <Button
              className="mx-2  border-0 btn btn-primary  border-0"
              onClick={toggle}
            >
              {show ? "Reply" : "Hide"}
            </Button>
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
                  className="ms-2 w-50 border-0 btn btn-primary  border-0"
                >
                  write Reply
                </Button>
              </div>
            </div>
          )}
        </div>

        <div
          className={`my-3 ms-2 ${commentData.replies.length == 0 ? "d-none" : ""}`}
          onClick={toggleReply}
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
