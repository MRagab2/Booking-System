import { useEffect, useState } from "react";
import "./ConfirmBook.css"
import { BsPaypal } from "react-icons/bs";
import axios from "axios";
import { BaseUrl } from "../../assets/Data";
import Cookies from "js-cookie";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const ConfirmBook = () => {
    const [fullName, setFullName] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [requestID, setRequestID] = useState()
    const [day, setDay] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    useEffect(() => {
        axios.get(`${BaseUrl}/user/id/${Cookies.get("userId")}`)
            .then(res => {
                setFullName(res.data.fullName)
                setPhone(res.data.phone)
                setEmail(res.data.email)
                setRequestID(res.data.requestID)
                axios.get(`${BaseUrl}/request/${requestID}`,
                    {
                        headers: {
                            authToken: Cookies.get("userToken")
                        }
                    })
                    .then(res => {
                        setDay(res.data.day)
                        setStartTime(res.data.startTime)
                        setEndTime(res.data.endTime)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })

    })
    return (
        <>
            <section className="py-5 mt-5">
                <div className="container py-5">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <h2 className="fw-bold">Confirm Booking</h2>
                            <p className="text-muted w-lg-50">The invitation link will be automatically sent to your email so be sure of your contanct info.</p>
                        </div>
                    </div>
                    <div className="row g-0 row-cols-1 row-cols-md-2 row-cols-xl-3 d-flex align-items-md-center align-items-xl-center">
                        <div className="col offset-xl-2 mb-4">
                            <div className="card bg-primary border-light">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h3 className="fw-bold mb-0 text-warning" >{fullName}</h3>
                                            <br />
                                            <h4 className="display-5 text-white fw-bold">{day} <br /><span style={{ fontSize: "29px" }}>{startTime}-{endTime}</span></h4>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-wrap flex-md-column justify-content-between h-100">
                                        <div className="d-flex align-items-center p-3">
                                            <div className="bs-icon-md bs-icon-circle bs-icon-white shadow d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon bs-icon-ms icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-telephone">
                                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
                                            </svg></div>
                                            <div className="px-2">
                                                <h6 className="fw-bold mb-0">Your Phone</h6>
                                                <p className="text-white mb-0">{phone}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center p-3">
                                            <div className="bs-icon-sm bs-icon-circle bs-icon-white shadow d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon bs-icon-md icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-envelope">
                                                <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"></path>
                                            </svg></div>
                                            <div className="px-2">
                                                <h6 className="fw-bold mb-0">Your Email</h6>
                                                <p className="text-white mb-0">{email}</p>
                                            </div>
                                        </div>
                                        <a className="btn btn-sm btn-warning shadow d-block w-100" href="/e-learning" style={{ marginTop: "11px " }}>Cancel</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col mb-4 ms-1">
                            <div className="card text-white bg-info">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h4 className="display-6 fw-bold">Your Total Bill is $38</h4>
                                            <br />
                                        </div>
                                    </div>

                                    <div className="container justify-content-center">
                                        <div className="ref-row ref-checkout-buttons row">
                                        <PayPalScriptProvider options={{ "client-id": "test" }}>
                                            <PayPalButtons style={{ layout: "horizontal" }} />
                                        </PayPalScriptProvider>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ConfirmBook