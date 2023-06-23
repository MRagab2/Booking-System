
import "./Dashboard.css"
import { Calendar } from "../../Components"
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { reservationsDisplay } from "../../redux/userDetailsSlice";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BaseUrl } from "../../assets/Data"
import axios from "axios";
import Cookies from "js-cookie";




const Dashboard = () => {
    const [closedStatus, setClosedStatus] = useState("")
    const [day, setDay] = useState()
    const [time, setTime] = useState()
    const reservations = useSelector(state => state.userDetailsSlice.reservations)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(reservationsDisplay())
        setClosedStatus("")
    }, [dispatch])
    const deleteResirvation = (ID) => {

        axios.delete(`${BaseUrl}/request/${ID}`
            ,
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            }
        )
            .then(res => {
                window.location.assign("/e-learning/Admin")
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
                            <li><a className="dropdown-item" onClick={() => deleteResirvation(record.id)}>Delete</a></li>
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
                    <p>{record.userName}</p>
                </div>


            )
        },
        {
            title: 'Day',
            dataIndex: 'day',
            key: 'day',
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record) => {
                const d = new Date(record.createdAt);
                const timeStampCon = d.getDate() + '/' + (d.getMonth()) + '/' + d.getFullYear() + " " + d.getHours() + ':' + d.getMinutes();
                return <p style={{ display: "contents" }}>{timeStampCon}</p>
            }
        },


    ];
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${BaseUrl}/request`, {
            userID: Cookies.get("userId"),
            day,
            startTime: time.slice(0, 5),
            endTime: time.slice(6)

        },
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            })
            .then(res => {
                console.log(res)
                setClosedStatus("true")
                window.location.assign("/e-learning/Admin")
            })
            .catch(err => {
                console.log(err)
                setClosedStatus("false")
            })
    }
    return (
        <>
            <div className="row ">
                <div className="col-12 calendar-admin-con">
                    <div className="calendar-admin">
                        <Calendar />
                    </div>
                </div>
            </div>
            <div className="row ">
                <div className="col-12 grid-margin">
                    <div className="card-dashboard card-dashboard-2">
                        <div className="card-body">
                            <h4 className="card-title">Reservation</h4>
                            <div className="table-responsive">
                                <Table className="antd-table" dataSource={reservations} columns={columns} pagination={{
                                    pageSize: 5
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <h1 style={{ color: "white" }}>Book Your Own Reservation </h1>
                <div className="book-con-admin p-5 d-flex justify-content-center">
                    <Button variant="primary" onClick={handleShow} >
                        Book Your Own Reservation
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label className="form-label-admin">Date</Form.Label>
                                    <Form.Control type="date" onChange={(e) => setDay(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label className="form-label-admin">Password</Form.Label>
                                    <Form.Select aria-label="Default select example" id="exampleFormControlInput2" style={{ background: "#2A3038", border: "1px solid #2A3038", color: "white" }} onChange={(e) => setTime(e.target.value)} required>
                                        <option>Open this select menu</option>
                                        <option value="11:00-11:59">11:00-11:59</option>
                                        <option value="12:00-12:59">12:00-12:59</option>
                                        <option value="13:00-13:59">13:00-13:59</option>
                                    </Form.Select>
                                </Form.Group>
                                {closedStatus === "true" && <div class="alert alert-success" role="alert">
                                    Your Reservation Send Successfuly
                                </div>}
                                {closedStatus === "false" && <div class="alert alert-danger" role="alert">
                                    Closed
                                </div>}
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>

        </>
    )
}

export default Dashboard