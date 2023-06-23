import { useState } from "react"
import "./ReviewsForm.css"
import { useDispatch } from "react-redux"
import { sendReviews } from "../../redux/userDetailsSlice"
import axios from "axios"
import Cookies from "js-cookie"

const ReviewsForm = () => {
    const [rate, setRate] = useState()
    const [content, setContent] = useState()
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(sendReviews({ rate, content, userID: Cookies.get("userId") }))
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row row-form-reviews">
                    <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded contact-con form-reviews">
                        <div className="form-con">
                            <h2>Make Your Review</h2>
                            <form className="form form-book" onSubmit={(e) => handleSubmit(e)}>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label" style={{ justifyContent: "start" }}>Rate</label>
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => setRate(e.target.value)}>
                                        <option defaultValue>Open to select the Rate</option>
                                        <option value="Not Good">Not Good</option>
                                        <option value="Good">Good</option>
                                        <option value="Excelent">Excelent</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label" style={{ justifyContent: "start" }}>Content</label>
                                    <textarea class="form-control form-i te" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setContent(e.target.value)}></textarea>
                                </div>
                                <div className="container">
                                    <div className="row " style={{ display: "flex", justifyContent: "center" }}>
                                        <div className="col-6 col-btn-center"><button className="btn btn-secondary rounded mt-3 btn-book">Send</button></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewsForm