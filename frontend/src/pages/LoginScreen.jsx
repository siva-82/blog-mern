import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { setCredentials } from "../slices/authSlice";
import { searchBlog, clearSearchBlog } from "../slices/blogSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/ui/Loader";

const Login = () => {
  const [email, setEmail] = useState("john@gmail.com");
  const [password, setPassword] = useState("john");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo, isLoadingUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/allblogs");
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);

      if (res) {
        dispatch(setCredentials(res));
        navigate("/allblogs");
      }
    } catch (err) {
      toast.error(err?.data?.message || err);
    }
  };
  const logoHandle = () => navigate("/allblogs");
  return (
    <>
      <div className="app__header">
        <h3
          className="logoBlog"
          style={{ cursor: "pointer" }}
          onClick={logoHandle}
        >
          Blog
        </h3>
      </div>
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="Password">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            className="mt-3 w-100 border-0"
            style={{ backgroundColor: "#0095F6" }}
          >
            Sign In
          </Button>
          {isLoading && <Loader />}
          <Row className="py-3">
            <Col>
              Don't have an account? <Link to="/register">Sign up</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default Login;

// "server":{
//   "port":3000,
//   "proxy":{
//     "/api":{
//       "target":"http://localhost:5000",
//       "changeOrigin":"true"
//     }
//   }
// }
