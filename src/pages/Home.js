import axios from "axios";
import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import Blog from "../components/Blogs";
import Search from "../components/Search";
import Category from "../components/Category";
import LatestBlog from "../components/LatestBlog";
import Pagination from "../components/Pagination";

const Home = () => {
  const [data, setData] = useState();
  const [latestBlog, setLatestBlog] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBlog, setTotalBlog] = useState(null);
  const [pageLimit] = useState(6);

  const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech", "Health", "Business"];

  useEffect(() => {
    loadBlogData(0, 6, 0);
    fetchLatestBlog();
  }, []);

  const loadBlogData = async (start, end, increase, operation) => {
    const totalBlog = await axios.get("http://localhost:5500/blogs");
    setTotalBlog(totalBlog.data.length);
    const response = await axios.get(
      `http://localhost:5500/blogs?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setData(response.data);
      if (operation) {
        setCurrentPage(0);
      } else {
        setCurrentPage(currentPage + increase);
      }
    } else {
      toast.error("Something went wrong");
    }
    console.log(data);
  };

  const fetchLatestBlog = async () => {
    const totalBlog = await axios.get("http://localhost:5500/blogs");
    const start = totalBlog.data.length - 4;
    const end = totalBlog.data.length;
    const response = await axios.get(
      `http://localhost:5500/blogs?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setLatestBlog(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you want to delete this blog ?")) {
      const response = await axios.delete(`http://localhost:5500/blogs/${id}`);
      if (response.status === 200) {
        toast.success("Blog deleted Successfuly!");
        loadBlogData(0, 5, 0, "delete");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const excerpt = (str) => {
    if (str.length > 100) {
      str = str.substring(0, 100) + "...";
    }
    return str;
  };

  //search handle
  const onInputChange = (e) => {
    if (!e.target.value) {
      loadBlogData(0, pageLimit, 0);
    }
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `http://localhost:5500/blogs?q=${searchValue}`
    );
    if (response.status == 200) {
      setData(response.data);
    } else {
      toast.error("something went wrong");
    }
  };

  //category handle
  const handleCategory = async (category) => {
    const response = await axios.get(
      `http://localhost:5500/blogs?category=${category}`
    );
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Search
        searchValue={searchValue}
        onInputChange={onInputChange}
        handleSearch={handleSearch}
      />
      <MDBRow>
        {(!data || data.length === 0) && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No blog found!
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data &&
                data.length > 0 &&
                data.map((item, index) => {
                  return (
                    <Blog
                      key={index}
                      {...item}
                      excerpt={excerpt}
                      handleDelete={handleDelete}
                    />
                  );
                })}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        <MDBCol size="3">
          <h4 className="text-start">Latest Post</h4>
          {latestBlog.map((item, index) => (
            <LatestBlog key={index} {...item} />
          ))}
          <Category options={options} handleCategory={handleCategory} />
        </MDBCol>
      </MDBRow>
      <div className="mt-3" style={{ marginBottom: "1rem" }}>
        <Pagination
          currentPage={currentPage}
          loadBlogsData={loadBlogData}
          pageLimit={pageLimit}
          data={data}
          totalBlog={totalBlog}
        />
      </div>
    </>
  );
};

export default Home;
