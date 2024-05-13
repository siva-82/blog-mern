import React from "react";

const PaginationContainer = ({
  blogsPerPage,
  totalBlogs,
  paginate,
  currentPage,
}) => {
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  const increasePageNumber = () => {
    if (currentPage < pageNumbers.length) paginate(currentPage + 1);
  };
  const decreasePageNumber = () => {
    if (currentPage !== 1) paginate(currentPage - 1);
  };
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${totalBlogs <= 3 ? "d-none " : ""}`}>
            <button
              disabled={Number(currentPage) === Number(1)}
              onClick={decreasePageNumber}
              className="page-link"
            >
              Previous
            </button>
          </li>
          {pageNumbers?.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}

          <li className={`page-item ${totalBlogs <= 3 ? "d-none " : ""}`}>
            <button
              disabled={Number(currentPage) === Number(pageNumbers.length)}
              onClick={increasePageNumber}
              className="page-link"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PaginationContainer;
