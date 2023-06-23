import "./Reviews.css"
import { Carousel, TestmonialComponent } from "../../Components"
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { Table } from "antd"
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../assets/Data"

const Reviews = () => {
    const [reviews, setReviews] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${BaseUrl}/review`, {
            headers: {
                authToken: Cookies.get("userToken")
            }
        })
            .then(res => {
                setReviews(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const hideHandler = (ID, Status) => {
        axios.put(`${BaseUrl}/review/hide/${ID}`,
            { status: Status },
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            })
            .then(res => {
                window.location.assign("/e-learning/Admin/Reviews")
            })
            .catch(err => {
                console.log(err)
            })
    }
    const deleteHandler = (ID) => {
        axios.delete(`${BaseUrl}/review/${ID}`,
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            })
            .then(res => {
                window.location.assign("/e-learning/Admin/Reviews")
            })
            .catch(err => {
                console.log(err)
            })

    }
    const columns = [

        {
            title: ' ',
            render: (text, record) => (

                <>
                    <div className="dropdown">
                        <BiDotsVerticalRounded className=" dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: "30px", height: "30px" }} />
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" onClick={() => hideHandler(record.id, record.status)} >
                                {record.status == "hidden" ? "Unhide" : "hide"}
                            </a></li>
                            <li>
                                <a className="dropdown-item" onClick={() => deleteHandler(record.id)}  >
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                </>
            ),
        },
        {
            title: 'user Name ',
            dataIndex: 'userName',
            key: 'userName',
            render: (text, record) => (
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "inherit" }}>
                    <img width="30px" height="30px" style={{ marginRight: "10px" }} src={record.userAvatar} alt="avatar" key={record.id} />
                    <p>{text}</p>
                </div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },

    ];
    return (
        <>
            <TestmonialComponent>
                <Carousel classname=" reviews" pending="pending" buttons="true" />
            </TestmonialComponent>
            <div className="col-12 grid-margin">
                <div className="card-dashboard card-dashboard-2">
                    <div className="card-body">
                        <h4 className="card-title">Reviews</h4>
                        <div className="table-responsive">
                            <Table className="antd-table" dataSource={reviews} columns={columns} pagination={{
                                pageSize: 5
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reviews