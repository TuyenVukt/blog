import React from "react";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBBtn,
} from "mdb-react-ui-kit";

const Pagination = ({
  currentPage,
  pageLimit,
  loadBlogsData,
  data,
  totalBlog,
}) => {
  const renderPagination = () => {
    if (
      // (currentPage === 0 && data.length < 5) ||
      totalBlog === pageLimit &&
      currentPage === 0
    )
      return null;
    if (currentPage === 0) {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn rounded onClick={() => loadBlogsData(pageLimit, pageLimit*2, 1)}>
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (
      currentPage < pageLimit - 1 &&
      data.length === pageLimit &&
      totalBlog - data.length !== pageLimit
    ) {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              rounded
              onClick={() =>
                loadBlogsData((currentPage - 1) * pageLimit, currentPage * pageLimit, -1)
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              onClick={() =>
                loadBlogsData((currentPage + 1) * pageLimit, (currentPage + 2) * pageLimit, 1)
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              rounded
              onClick={() =>
                loadBlogsData((currentPage - 1) * pageLimit, currentPage * pageLimit, -1)
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return <div>{renderPagination()}</div>;
};

export default Pagination;
