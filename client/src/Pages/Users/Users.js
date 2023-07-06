import "./Users.css"
import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BaseUrl } from "../../assets/Data"

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get(`${BaseUrl}/user`, {
            headers: {
                authToken: Cookies.get("userToken")
            }
        })
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    const deleteUser = (ID) => {
        axios.delete(`${BaseUrl}/user/${ID}`,
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            })
            .then(res => {
                console.log(res)
                window.location.assign("/e-learning/Admin/Users")
            })
            .catch(err => {
                console.log(err)
            })
    
    }
    const statusUser = (ID, Status) => {
        {
            ID && Status && axios.put(`${BaseUrl}/user/${ID}`,
                { status: Status },
                {
                    headers: {
                        authToken: Cookies.get("userToken")
                    }
                })
                .then(res => {
                    console.log(res)
                    window.location.assign("/e-learning/Admin/Users")
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }
    const columns = [
        {
            title: ' ',
            render: (text, record) => (

                <>
                    <div className="dropdown">
                        <BiDotsVerticalRounded className=" dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: "30px", height: "30px" }} />
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={() => deleteUser(record.id)}>Delete</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => {
                                statusUser(record.id, record.status)
                            }}>{record.status == "active" ? "deactive" : "active"}</a></li>
                        </ul>
                    </div>
                </>
            ),
        },

        {
            title: 'user Name ',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text, record) => (
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "inherit" }}>
                    <img width="30px" height="30px" style={{ marginRight: "10px" }} src={record.avatar} alt="avatar" key={record.id} />
                    <p>{text}</p>
                </div>
            )
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record) => {
                const d = new Date(record.createdAt);
                const timeStampCon = d.getDate() + '/' + (d.getMonth()) + '/' + d.getFullYear() + " " + d.getHours() + ':' + d.getMinutes();
                return <p style={{ display: "contents" }}>{timeStampCon}</p>
            }
        },
        {
            title: 'Is He Booked ',
            dataIndex: 'isBooked',
            key: 'isBooked',
            render: (text, record) => (
                <>
                    <p style={{ display: "contents" }}>{`${record.isBooked}`}</p>
                </>
            )

        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },

    ];
    return (
        <>
            <div className="row ">
                <div className="col-12 grid-margin">
                    <div className="card-dashboard card-dashboard-2">
                        <div className="card-body">
                            <h4 className="card-title">User Status</h4>
                            <div className="table-responsive">
                                <Table className="antd-table" dataSource={users} columns={columns} pagination={{
                                    pageSize: 5
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users