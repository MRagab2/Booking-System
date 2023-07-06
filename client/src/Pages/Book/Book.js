import { Form } from "react-bootstrap"
import { Calendar } from "../../Components"
import "./Book.css"
import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { BaseUrl } from "../../assets/Data"

const Book = () => {
    const [closedStatus, setClosedStatus] = useState("")
    const [day, setDay] = useState()
    const [time, setTime] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${BaseUrl}/request`, {
            price: "10",
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
                navigate("/Confirm")

            })
            .catch(err => {
                console.log(err)
                setClosedStatus("false")

            })
    }
    return (
        <>
            <div className="con-cal">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7 col-sm-12 col-calendar"><Calendar /></div>
                        <div className="col-md-5 col-sm-12 col-book-con">
                            <div class="shadow-lg p-3 mb-5 bg-body-tertiary rounded contact-con">
                                <div className="form-con">
                                    <h2>Book Now</h2>
                                    <form className="form form-book" onSubmit={(e) => handleSubmit(e)}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Day</label>
                                            <input type="date" className="form-control form-i" id="exampleFormControlInput1" placeholder="Mi3ad" style={{ color: "black" }} onChange={(e) => setDay(e.target.value)} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput2" className="form-label">Time</label>
                                            <Form.Select aria-label="Default select example" id="exampleFormControlInput2" onChange={(e) => setTime(e.target.value)} required>
                                                <option>Open this select menu</option>
                                                <option value="11:00-11:59">11:00-11:59</option>
                                                <option value="12:00-12:59">12:00-12:59</option>
                                                <option value="13:00-13:59">13:00-13:59</option>
                                            </Form.Select>
                                        </div>
                                        <div className="container">
                                            <div className="row " style={{ marginTop: "30px" }}>
                                                {closedStatus === "true" && <div class="alert alert-success" role="alert">
                                                    Your Reservation Send Successfuly
                                                </div>}
                                                {closedStatus === "false" && <div class="alert alert-danger" role="alert">
                                                    Closed
                                                </div>}
                                                <div className="col-6 col-btn-center"><a className="btn btn-secondary rounded mt-3 btn-back" href="/e-learning">Back</a></div>
                                                <div className="col-6 col-btn-center"><button className="btn btn-secondary rounded mt-3 btn-book">Book Now</button> </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}

export default Book