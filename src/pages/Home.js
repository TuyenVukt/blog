import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import Blog from '../components/Blogs';

const Home = () => {

    const [data, setData] = useState();

    useEffect(() => {
        loadBlogData();
    }, [])

    const loadBlogData = async () => {
        const response = await axios.get("http://localhost:5500/blogs");
        if (response.status === 200) {
            setData(response.data);
        } else {
            toast.error("Something went wrong");
        }
        console.log(data);
    }

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure that you want to delete this blog ?")){
            const response = await axios.delete(`http://localhost:5500/blogs/${id}`);
            if(response.status === 200){
                toast.success("Blog deleted Successfuly!");
                loadBlogData();
            } else  {
                toast.error("Something went wrong!")
            }
        }
    }

    const excerpt = (str) => {
        if (str.length > 100) {
            str = str.substring(0, 100) + "...";
        }
        return str;
    }

    return (
        <>
            <MDBRow>
                {(!data || data.length === 0) && (
                    <MDBTypography
                        className='text-center mb-0'
                        tag='h2'>
                        No blog found!
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow>
                            {data && data.length > 0 && data.map((item, index) => {
                                return <Blog
                                    key={index}
                                    {...item}
                                    excerpt={excerpt}
                                    handleDelete={handleDelete}
                                />
                            })}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
        </>

        // <p>Hello from HOME</p>
    )

};

export default Home;