import axios from "axios";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Blog = () => {

    const [blog, setBlog] = useState();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getSingleBlog();
        }
    }, [id])

    const getSingleBlog = async () => {
        const response = await axios.get(`http://localhost:5500/blogs/${id}`);

        if (response.status === 200) {
            setBlog(response.data)
        } else {
            toast.error("Something went wrong!");
        }
    }

    const styleInfo = {
        display: "inline",
        marginLeft: "5px",
        float: "right",
        marginTop: "7px"
    }
    return (
        <MDBContainer style={{ border: "1px solid #d1ebe8" }}>
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


        </MDBContainer>
    )
}

export default Blog;