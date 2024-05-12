import "bootstrap/dist/css/bootstrap.min.css";
import BlogCard from "../components/BlogCard";
import SearchPage from "../pages/SearchPage";

import React, { useEffect, useState } from "react";
import {
  useGetBlogSearchQuery,
  useGetBlogsQuery,
  useGetPaginatedBlogsQuery,
} from "../slices/blogApiSlice";
import { MdPostAdd,MdLogout  } from "react-icons/md"
import PaginationContainer from "../components/ui/PaginationContainer";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { Button, Form } from "react-bootstrap";
import { allData } from "../slices/blogSlice";
import UploadBlog from "../components/UploadBlog";
import { Link } from "react-router-dom";


const AllBlogs = () => {
  const { pageNumber } = useSelector((state) => state?.blog);
  
  


  const [searchBlogs, setSearchBlogs] = useState("");
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [blogsPerPage] = useState(3);

  const [blogSearch, setBlogSearch] = useState();
  const dispatch = useDispatch();

  // const {data:paginatedblogs,isError,isLoading}=useGetPaginatedBlogsQuery(Number(pageNumber))||{}
  const { data: allBlogs, isError, isLoading } = useGetBlogsQuery() || {};
  // const {data:searchBlogData}=useGetBlogSearchQuery(blogSearch)
  const { userInfo, isLoadingUser } = useSelector((state) => state.auth);
  // console.log("allBlogsData");
  // console.log(allBlogs);

 

  const searchBlogsHandler = (e) => {
    e.preventDefault();
  };
 

 
  const indexOfLastPost = currentPage * blogsPerPage;
  const indexOfFirtsPost = indexOfLastPost - blogsPerPage;
  const currentBlogs = allBlogs?.slice(indexOfFirtsPost, indexOfLastPost);
   let newSearch;

   newSearch = allBlogs?.filter((blogs) =>blogs?.title?.includes(searchBlogs))
console.log(indexOfLastPost, indexOfFirtsPost, newSearch);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="app__header">
        <div>
          <h3>Blog</h3>
        </div>
        <div className="searchbar d-flex flex-column mx-auto justify-content-center align-items-start">
          {/* <input className="searchbar d-flex flex-column mt-5 mb-5  w-75 mx-auto justify-content-center align-items-start" type="text" placeholder="search" /> */}
          <Form
            className="d-flex flex-row mx-auto justify-content-center align-items-center"
            onSubmit={searchBlogsHandler}
          >
            <Form.Group className="my-2" controlId="email">
              <Form.Control
                type="text"
                placeholder="Search blogs"
                value={searchBlogs}
                required
                onChange={(e) => setSearchBlogs(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button
              type="submit"
              className="mx-2 border-0 btn btn-primary  border-0"
              style={{ backgroundColor: "#0095F6" }}
            >
              search
            </Button>
          </Form>
          
        </div>
   

        {userInfo?.userName ? (
          // <div onClick={() => auth.signOut()}>Logout</div>
          <div className="app__loginContainer">
            <div>{userInfo.userName}</div>
            <div>Logout</div><span><MdLogout /></span>
          </div>
        ) : (
          <div className="app__loginContainer">
            {/* <div onClick={() => setOpen(true)}>Login</div>
            <div onClick={() => setRegisterOpen(true)}>Sign Up</div> */}
            <div>Login</div>
            <div>Sign Up</div>
          </div>
        )}
      </div>

      <div className="upc container">
        <div className="row">
        <div  className=""   >
              <Link className ='UploadBlogContainer'to='/uploadBlog'>
            <MdPostAdd style={{ height: "50px",width:'50px' }} data-bs-toggle="modal" /> {"Add Blog"}
            </Link>
            </div>
        <div className="blogs">
            
            
            {!isLoading && !searchBlogs
              ? currentBlogs?.slice(0)?.map((blog) => (
                  <>
                    <BlogCard blog={blog} />
                  </>
                ))
              : 
              (
                <>
                <SearchPage newSearch={newSearch}/></>
                
              )
                }
          </div>

         
          { 
            !searchBlogs&& allBlogs &&
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
        }

          {!isLoading &&searchBlogs!=="" && newSearch?.length == 0  &&
            <>
              <div>Search Not Found</div>
            </>
           }
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
