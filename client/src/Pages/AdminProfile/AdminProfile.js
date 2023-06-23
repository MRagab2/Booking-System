import { Link } from "react-router-dom"
import "./AdminProfile.css"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails } from "../../redux/userDetailsSlice"
import Cookies from "js-cookie"
import { useEffect } from "react"

const AdminProfile = () => {
    const dispatch = useDispatch()
    const userDetail = useSelector(state => state.userDetailsSlice.userDetail)
    useEffect(() => {
        dispatch(getUserDetails({ userID: Cookies.get("userId") }))
    }, [dispatch])
    return (
        <>
            <div className="container-xl px-4 mt-4 cont-edit">
                <div className="row">
                    <div className="col-xl-4">
                        {/* <!-- Profile picture card--> */}
                        <div className="card mb-4 mb-xl-0" style={{ background: "#191c24 " }}>
                            <div className="card-header">Profile Picture</div>
                            <div className="card-body text-center">
                                {/* <!-- Profile picture image--> */}
                                <img className="img-account-profile rounded-circle mb-2" src={userDetail.avatar} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-profile-details">
                        {/* <!-- Account details card--> */}
                        <div className="card mb-4 card-profile" style={{ background: "#191c24 " }}>
                            <div className="card-header card-header-profile">
                                <p> Account Details</p>
                            </div>
                            <div className="card-body">
                                <form>
                                    {/* <!-- Form Group (username)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputUsername" style={{ color: "white", display: "flex", justifyContent: "start" }}>Full Name </label>
                                        <input className="form-control" id="inputUsername" type="text" value={userDetail.fullName} disabled />
                                    </div>
                                    {/* <!-- Form Row        --> */}
                                    <div className="row gx-3 mb-3">
                                        {/* <!-- Form Group (location)--> */}

                                    </div>
                                    {/* <!-- Form Group (email address)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputEmailAddress" style={{ color: "white", display: "flex", justifyContent: "start" }}>Email address</label>
                                        <input className="form-control" id="inputEmailAddress" type="email" disabled value={userDetail.email} />
                                    </div>
                                    {/* <!-- Form Row--> */}
                                    <div className="row gx-3 mb-3">
                                        {/* <!-- Form Group (phone number)--> */}
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputPhone" style={{ color: "white", display: "flex", justifyContent: "start" }}>Phone number</label>
                                            <input className="form-control" id="inputPhone" type="tel" disabled value={userDetail.phone} />
                                        </div>
                                        <div className="col-md-6" style={{ display: "flex", justifyContent: "end", alignItems: "end" }}>
                                            <Link className="btn btn-primary" to="/Admin/AdminEditProfile">Edit Profile</Link>
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
    )
}

export default AdminProfile