import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import BlogCard from "../components/BlogCard";
import SearchPage from "../pages/SearchPage";
import PaginationContainer from "../components/ui/PaginationContainer";
import Tags from "../components/Tags";
import Loader from "../components/ui/Loader";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetBlogsQuery } from "../slices/blogApiSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

import { MdPostAdd, MdLogout, MdSearch } from "react-icons/md";
import { Button, Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import CloseButton from "react-bootstrap/CloseButton";

const AllBlogs = () => {
  const { pageNumber } = useSelector((state) => state?.blog);

  const [searchBlogs, setSearchBlogs] = useState("");
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [blogsPerPage] = useState(3);

  const [blogSearch, setBlogSearch] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const {data:paginatedblogs,isError,isLoading}=useGetPaginatedBlogsQuery(Number(pageNumber))||{}
  const { data: allBlogs, isError, isLoading } = useGetBlogsQuery() || {};
  // const {data:searchBlogData}=useGetBlogSearchQuery(blogSearch)
  const { userInfo, isLoadingUser } = useSelector((state) => state.auth);

  console.log("allBlogs", allBlogs);

  const searchBlogsHandler = (e) => {
    e.preventDefault();
  };
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/allblogs");
    } catch (error) {}
  };

  const indexOfLastPost = currentPage * blogsPerPage;
  const indexOfFirtsPost = indexOfLastPost - blogsPerPage;
  const currentBlogs = allBlogs?.slice(indexOfFirtsPost, indexOfLastPost);
  let newSearch;

  newSearch = allBlogs?.filter((blogs) => blogs?.title?.includes(searchBlogs));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="app__header">
        <div>
          <h3 className="logoBlog">Blog</h3>
        </div>
        <div className="searchbar d-flex flex-column mx-auto justify-content-center align-items-start">
          {/* <input className="searchbar d-flex flex-column mt-5 mb-5  w-75 mx-auto justify-content-center align-items-start" type="text" placeholder="search" /> */}
          <Form
            className="d-flex flex-row mx-auto justify-content-center align-items-center"
            onSubmit={searchBlogsHandler}
          >
            <Form.Group className="my-2" controlId="email">
              {/* <Form.Control
                type="text"
                placeholder="Search blogs"
                value={searchBlogs}
                required
                onChange={(e) => setSearchBlogs(e.target.value)}
              ></Form.Control>  */}
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search blogs"
                  value={searchBlogs}
                  required
                  onChange={(e) => setSearchBlogs(e.target.value)}
                />

                <Button variant="outline-secondary" id="button-addon2">
                  <MdSearch
                    className="mx-2"
                    style={{ height: "25px", width: "30px" }}
                  />
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </div>

        {userInfo?.userName ? (
          // <div onClick={() => auth.signOut()}>Logout</div>
          <div className="app__loginContainer">
            <div style={{ cursor: "pointer", margin: "2px", padding: "8px" }}>
              {userInfo.userName}
            </div>
            <div
              style={{ cursor: "pointer", margin: "2px", padding: "8px" }}
              onClick={logoutHandler}
            >
              <span style={{ marginRight: "2px" }}>
                <MdLogout />
              </span>
              Logout
            </div>
          </div>
        ) : (
          <div className="app__loginContainer">
            {/* <div onClick={() => setOpen(true)}>Login</div>
            <div onClick={() => setRegisterOpen(true)}>Sign Up</div> */}
            <Link
              style={{ cursor: "pointer", margin: "2px", padding: "8px" }}
              to={"/"}
            >
              Login
            </Link>
            <Link
              style={{ cursor: "pointer", margin: "2px", padding: "8px" }}
              to={"/Register"}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      <div className="upc container">
        <div className="row">
          <div className="d-flex justify-content-center">
            <Link className="UploadBlogContainer" to="/uploadBlog">
              <MdPostAdd
                style={{ height: "50px", width: "50px" }}
                data-bs-toggle="modal"
              />{" "}
              {"Add Blog"}
            </Link>
          </div>
          <div className="blogs ">
            <div className="col-12 mx-auto my-2 w-75 tagContainer">
              <Tags
                allBlogs={allBlogs}
                searchBlogs={searchBlogs}
                setSearchBlogs={setSearchBlogs}
              />
            </div>

            {!isLoading && !searchBlogs ? (
              currentBlogs?.slice(0)?.map((blog) => (
                <>
                  <BlogCard key={blog._id} blog={blog} />
                </>
              ))
            ) : (
              <>
                <SearchPage newSearch={newSearch} />
              </>
            )}
          </div>
          {isLoading && <Loader />}

          {!searchBlogs && allBlogs && (
            <>
              <div>
                <PaginationContainer
                  currentPage={currentPage}
                  blogsPerPage={blogsPerPage}
                  totalBlogs={allBlogs?.length}
                  paginate={paginate}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {!isLoading && searchBlogs !== "" && newSearch?.length === 0 && (
        <>
          <div className="d-flex justify-content-center">Search Not Found</div>
        </>
      )}
    </>
  );
};

export default AllBlogs;
