import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Badge from "../components/Badge";

const Blog = () => {
  const [blog, setBlog] = useState();
  const [relatedPost, setRelatedPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleBlog();
    }
  }, [id]);

  const getSingleBlog = async () => {
    const response = await axios.get(`http://localhost:5500/blogs/${id}`);
    const relatedPostData = await axios.get(
      `http://localhost:5500/blogs?category=${response.data.category}&_start=0&_end=3`
    );
    if (response.status === 200 || relatedPostData.status === 200) {
      setBlog(response.data);
      setRelatedPost(relatedPostData.data);
    } else {
      toast.error("Something went wrong!");
    }
    console.log(blog)
  };

  const excerpt = (str) => {
    if (str.length > 60) {
      str = str.substring(0, 60) + "...";
    }
    return str;
  };

  const styleInfo = {
    display: "inline",
    marginLeft: "5px",
    float: "right",
    marginTop: "7px",
  };
  return (
    <MDBContainer style={{ border: "1px solid #d1ebe8" , marginTop: "2rem", marginBottom: "2rem"}}>
      <Link to="/">
        <strong style={{ float: "left", color: "black" }} className="mt-3">
          Go Back
        </strong>
      </Link>
      <MDBTypography
        tag="h2"
        className="mt-2"
        style={{ display: "inline-block", margin: "20px" }}
      >
        {blog && blog.title}
      </MDBTypography>
      <div className="image">
        <img
          src={blog && blog.imageUrl}
          className="img-fluid rounded"
          alt={blog && blog.title}
          style={{ with: "100%", maxHeight: "600px" }}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <div style={{ height: "43px", background: "f6f6f6" }}>
          <MDBIcon
            style={{ float: "left" }}
            className="mt-3"
            far
            icon="calendar-alt"
            size="lg"
          />
          <strong
            style={{ float: "left", marginTop: "12px", marginLeft: "2px" }}
          >
            {blog && blog.date}
          </strong>
          <Badge styleInfo={styleInfo}>{blog && blog.category}</Badge>
        </div>
        <MDBTypography className="lead md-0">
          {blog && blog.description}
        </MDBTypography>
      </div>

      {relatedPost && relatedPost.length > 0 && (
        <>
          {relatedPost.length > 1 && <h1>Related Post</h1>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedPost
              .filter((item) => item.id != id)
              .map((item, index) => (
                <MDBCol size="4" style={{ marginTop: "2rem", marginBottom: "1rem" }}>
                  <MDBCard className='h-100 mt-2' style={{ maxWidth: "26rem" }}> 
                    <Link to={`/blog/${item.id}`}>
                      <MDBCardImage
                        src={item.imageUrl}
                        akt={item.title}
                        position="top"
                        style={{ maxWidth: "100%", height: "13rem" }}
                      />
                    </Link>
                    <MDBCardBody>
                      <MDBCardTitle>{item.title}</MDBCardTitle>
                      <div>
                            <MDBIcon
                                className="mt-1"
                                far
                                icon="calendar-alt"
                                size="lg"
                                style={{ marginRight: "5px" }}
                            />
                            <strong
                            >
                                {item.date}
                            </strong>
                        </div>
                      <MDBCardText>
                        {excerpt(item.description)}
                        <Link to={`/blog/${id}`}>Read More</Link>
                        </MDBCardText>
                        <Badge>{item.category}</Badge>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </MDBContainer>
  );
};

export default Blog;
