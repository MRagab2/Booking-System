import { Link } from "react-router-dom"
import "./Profile.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getUserDetails } from "../../redux/userDetailsSlice"
import Cookies from "js-cookie"

const Profile = () => {
    const dispatch = useDispatch()
    const userDetail = useSelector(state => state.userDetailsSlice.userDetail)
    useEffect(() => {
        dispatch(getUserDetails({ userID: Cookies.get("userId") }))
    }, [dispatch])
    return (
        <>
            <>
                <div className="container-xl px-4 mt-4 cont-edit">
                    {/* <!-- Account page navigation--> */}
                    <nav className="nav nav-borders">
                        <Link className="nav-link active" to="/" > Back To Home</Link>
                    </nav>
                    <hr className="mt-0 mb-4" />
                    <div className="row">
                        <div className="col-xl-4">
                            {/* <!-- Profile picture card--> */}
                            <div className="card mb-4 mb-xl-0">
                                <div className="card-header">Profile Picture</div>
                                <div className="card-body text-center">
                                    {/* <!-- Profile picture image--> */}
                                    <img className="img-account-profile rounded-circle mb-2" src={userDetail.avatar} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-profile-details">
                            {/* <!-- Account details card--> */}
                            <div className="card mb-4 card-profile">
                                <div className="card-header card-header-profile">
                                    <p> Account Details</p>
                                    <p className="status"> Account Status : {userDetail.status}</p>
                                </div>
                                <div className="card-body">
                                    <form>
                                        {/* <!-- Form Group (username)--> */}
                                        <div className="mb-3">
                                            <label className="small mb-1" htmlFor="inputUsername" style={{ color: "black", display: "flex", justifyContent: "start" }}>Full Name </label>
                                            <input className="form-control" id="inputUsername" type="text" value={userDetail.fullName} disabled />
                                        </div>
                                        {/* <!-- Form Row        --> */}
                                        <div className="row gx-3 mb-3">
                                            {/* <!-- Form Group (location)--> */}

                                        </div>
                                        {/* <!-- Form Group (email address)--> */}
                                        <div className="mb-3">
                                            <label className="small mb-1" htmlFor="inputEmailAddress" style={{ color: "black", display: "flex", justifyContent: "start" }}>Email address</label>
                                            <input className="form-control" id="inputEmailAddress" type="email" value={userDetail.email} disabled />
                                        </div>
                                        {/* <!-- Form Row--> */}
                                        <div className="row gx-3 mb-3">
                                            {/* <!-- Form Group (phone number)--> */}
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputPhone" style={{ color: "black", display: "flex", justifyContent: "start" }}>Phone number</label>
                                                <input className="form-control" id="inputPhone" type="tel" value={userDetail.phone} disabled />
                                            </div>
                                            <div className="col-md-6" style={{ display: "flex", justifyContent: "end", alignItems: "end" }}>
                                                <Link className="btn btn-primary" to="/EditProfile">Edit Profile</Link>
                                            </div>
                                            {/* <!-- Form Group (birthday)--> */}
                                        </div>
                                        {/* <!-- Save changes button--> */}

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default Profile