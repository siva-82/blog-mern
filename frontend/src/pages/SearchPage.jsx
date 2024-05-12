import "bootstrap/dist/css/bootstrap.min.css";
import BlogCard from "../components/BlogCard";

import React, {  useState } from "react";

import PaginationContainer from "../components/ui/PaginationContainer";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { Button, Form } from "react-bootstrap";
import { searchBlog } from "../slices/blogSlice";

const SearchPage = ({newSearch}) => {
  const { pageNumber } = useSelector((state) => state?.blog);

  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(3);

  const indexOfLastPost = currentPage * blogsPerPage;
  const indexOfFirtsPost = indexOfLastPost - blogsPerPage;
  const currentBlogs = newSearch?.slice(indexOfFirtsPost, indexOfLastPost);
  console.log(currentBlogs)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>

      <div className="container">
        <div className="row">
          <div className="blogs">
            {
              currentBlogs?.slice(0)?.map((blog) => (
                  <>
                    <BlogCard blog={blog} />
                  </>
                ))              
            }
          </div>

          {!newSearch ? (
            <>
            
            </>
          ) : (
            <>
              <div>
                <PaginationContainer
                  currentPage={currentPage}
                  blogsPerPage={blogsPerPage}
                  totalBlogs={newSearch?.length}
                  paginate={paginate}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
