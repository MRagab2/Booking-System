import "./Carousel.css"
import { Card } from "../"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getReviews } from "../../redux/userDetailsSlice"
import { BaseUrl } from "../../assets/Data"
import axios from "axios"
import Cookies from "js-cookie"

const Carousel = (props) => {
    const dispatch = useDispatch()
    const [buttons, setButtons] = useState(props.buttons)
    const review = useSelector(state => state.userDetailsSlice.reviews)
    useEffect(() => {
        dispatch(getReviews({ pending: props.pending }))
    }, [dispatch])
    const Accept = (ID) => {
        axios.put(`${BaseUrl}/review/${ID}`, {
            status: "unhidden"
        }, {
            headers: {
                authToken: Cookies.get("userToken")
            }
        }
        )
            .then(res => {
                console.log(res)
                window.location.assign("/e-learning/Admin/Reviews")
            })
            .catch(err => {
                console.log(err)
            })
    }
    const Cancel = (ID) => {
        axios.put(`${BaseUrl}/review/${ID}`, {
            status: "hidden"
        }, {
            headers: {
                authToken: Cookies.get("userToken")
            }
        }
        )
            .then(res => {
                console.log(res)
                window.location.assign("/e-learning/Admin/Reviews")
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            <div id="carouselExampleIndicators" className={"carousel slide" + props.classname}>

                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    {review.map(item =>
                        <div className="carousel-item active" key={item._id}>
                            <Card classname=" testmonial-card border">
                                <div className="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <img src={item.userAvatar} alt="avatar" />
                                    <p>{item.userName}</p>
                                    <h1 className="title" style={{ textAlign: "center" }}>
                                        <span style={{ paddingBottom: "10px", fontSize: "17px", display: "inline-block" }}>{item.rate}</span><br />
                                        {item.content}
                                    </h1>
                                    {buttons == "true" &&
                                        <div className="container" style={{ marginTop: "30px" }}>
                                            <div className="row">
                                                <div className="col-6" ><button type="submit" style={{ background: "green", color: "white", border: "none", borderRadius: "10px", padding: "10px" }} onClick={() => Accept(item.id)}>Accept</button>  </div>
                                                <div className="col-6" style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}> <button type="submit" onClick={() => Cancel(item.id)} style={{ background: "red", color: "white", border: "none", borderRadius: "10px", padding: "10px" }}>Decline</button></div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </Card>
                        </div>
                    )

                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" style={{ background: "white" }}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" style={{ background: "white" }}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Carousel