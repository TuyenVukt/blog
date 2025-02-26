import React from 'react';
import {
    MDBCol,
    MDBCard,
    MDBCardTitle,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'
import Badge from './Badge';

const Blog = ({ title, date, category, description, id, imageUrl, excerpt, handleDelete }) => {
    return (
        <>
            <MDBCol size="4" style={{ marginTop: "2rem", marginBottom: "1rem" }}>
                <MDBCard className='h-100 mt-2' style={{ maxWidth: "26rem" }}>
                    <MDBCardImage
                        src={imageUrl}
                        alt={title}
                        position="top"
                        style={{ maxWidth: "100%", height: "13rem" }}
                    />
                    <MDBCardBody>
                        <MDBCardTitle>{title}</MDBCardTitle>
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
                                {date}
                            </strong>
                        </div>

                        <MDBCardText>
                            {excerpt(description)}
                            <Link to={`/blog/${id}`}>Read More</Link>
                        </MDBCardText>
                        <Badge>{category}</Badge>
                        {/* <p>{category}</p> */}
                        <span>
                            <MDBBtn className="mt-1" tag="a" color="none" onClick={() => handleDelete(id)}>
                                <MDBIcon
                                    fas
                                    icon="trash"
                                    style={{ color: "#dd4b39" }}
                                    size="lg"
                                />
                            </MDBBtn>
                            <Link to={`/editBlog/${id}`}>
                                <MDBIcon
                                    fas
                                    icon="edit"
                                    style={{ color: "#55acee", marginLeft: "10px" }}
                                    size="lg"
                                />
                            </Link>
                        </span>
                    </MDBCardBody>

                </MDBCard>

            </MDBCol>
        </>
    )
};

export default Blog;
