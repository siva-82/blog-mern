import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useAddBlogMutation } from "../slices/blogApiSlice";
import "../App.css";

const UploadBlog = () => {
  const { userInfo, isLoadingUser } = useSelector((state) => state?.auth);

  const [addBlog, { isLoading: isLoadingBlog, isError: isErrorBlog }] =
    useAddBlogMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainPost, setMainPost] = useState("");
  const [image, setImage] = useState();

  const imgHandle = (e) => {
    e.preventDefault();

    setImage(e.target.files[0]);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("userName", userInfo.name);
    formData.append("email", userInfo.email);
    formData.append("userId", userInfo._id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("post", mainPost);

    // addPost(formData)

    // for (let [key, value] of formData) {
    //   console.log("formdataloop", `${key}: ${value}`);
    // }
    try {
      const res = await addBlog(formData);
    } catch (err) {
      console.log("BloG submitHandler res catch" + e?.data?.message || err);
    }
  };

  return (
    <>
      <div className="app__header">
        <div>
          <Link to="/allblogs">
            <h3 className="logoBlog">Blog</h3>
          </Link>
        </div>

        {userInfo?.userName ? (
          // <div onClick={() => auth.signOut()}>Logout</div>
          <div className="app__loginContainer">
            <div style={{ cursor: "pointer", margin: "2px", padding: "8px" }}>
              {userInfo.userName}
            </div>
            <div style={{ cursor: "pointer", margin: "2px", padding: "8px" }}>
              Logout
            </div>
          </div>
        ) : (
          <div className="app__loginContainer">
            {/* <div onClick={() => setOpen(true)}>Login</div>
            <div onClick={() => setRegisterOpen(true)}>Sign Up</div> */}
            <Link
              to={"/"}
              style={{ cursor: "pointer", margin: "2px", padding: "8px" }}
            >
              Login
            </Link>
            <Link
              to={"/register"}
              style={{ cursor: "pointer", margin: "2px", padding: "8px" }}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      <FormContainer>
        <h1 className="poppin">Create your Blog</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="title">
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="description">
            <Form.Control
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="mainPost">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Write your Thoughts..."
              value={mainPost}
              onChange={(e) => setMainPost(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="image">
            <Form.Control
              type="file"
              placeholder="choose image"
              onChange={imgHandle}
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            className="mt-3 w-100 border-0"
            style={{ backgroundColor: "#0095F6" }}
          >
            Upload
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UploadBlog;
