import "./Sidebar.css"
import Face from "../../assets/Images/face15.jpg"
import { BiDotsVerticalRounded, BiNews } from "react-icons/bi";
import { IoSpeedometerSharp } from "react-icons/io5";
import { AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { MdRateReview } from "react-icons/md";
import { AiOutlineBars } from "react-icons/ai";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import Cookies from "js-cookie";





const Sidebar = () => {
    const [visible, setVisible] = useState(false)
    const height = useAnimation()
    const opacity1 = useAnimation()
    const opacity2 = useAnimation()
    const display = useAnimation()
    const navigate = useNavigate()
    const sidebarHeight = async () => {
        await setVisible(!visible)
        height.start({
            position: visible ? "relative" : "fixed",
            height: visible ? "calc(280vh - 0px)" : "0px",
            top: visible ? "32px" : "0px",
            bottom: "0",
            overflow: "none",
        })
        opacity1.start({
            opacity: visible ? "1" : "0"
        })
        opacity2.start({
            opacity: visible ? "0" : "1"
        })

        display.start({
            display: visible ? "block" : "none"

        })
    }
    const logOutHandler = () => {
        Cookies.remove("userToken")
        Cookies.remove("userRole")
        Cookies.remove("userName")
        Cookies.remove("userId")
        navigate("/SignInUp")
    }
    return (
        <>
            <motion.nav initial={{ width: "250px", height: "calc(280vh - 0px)", top: "32px" }} animate={height} className="sidebar sidebar-offcanvas" id="sidebar">
                <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                    <div className="arrows-con" onClick={sidebarHeight}>
                        <motion.div className="down-arrow" animate={opacity1} > <AiOutlineBars className="up" /></motion.div>
                        <motion.div initial={{ opacity: "0" }} animate={opacity2} className="up-arrow"> <HiOutlineBars3CenterLeft className="down" /></motion.div>
                    </div>
                </div>
                <motion.ul className="nav animation" animate={opacity1}>
                    <li className="nav-item profile">
                        <div className="profile-desc">
                            <div className="profile-pic">
                                <div className="count-indicator">
                                    <motion.div className="img-animation">
                                        <img className="img-xs rounded-circle img-fluid " src={Face} alt="" />
                                    </motion.div>
                                    <span className="count bg-success"></span>
                                </div>
                                <div className="profile-name">
                                    <motion.h5 animate={display} className="mb-0 font-weight-normal">admin name</motion.h5>
                                    <motion.span animate={display}>admin</motion.span>
                                </div>
                            </div>
                            <a href="#" id="profile-dropdown" data-bs-toggle="dropdown"><i className="mdi mdi-dots-vertical"><BiDotsVerticalRounded /></i></a>
                            <div className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
                                <div className="dropdown-item preview-item">
                                    <li className="nav-item menu-items">
                                        <Link to="AdminProfile" className="nav-link">
                                            <span className="menu-icon">
                                                <i className="mdi mdi-speedometer"><CgProfile /></i>
                                            </span>
                                            <motion.span className="menu-title"> Admin Profile</motion.span>
                                        </Link>
                                    </li>
                                </div>
                                <div className="dropdown-divider"></div>
                                <motion.div animate={display} className="dropdown-item preview-item">
                                    <div className="preview-item-content">
                                        <li className="nav-item menu-items" >
                                            <Link to="AdminEditProfile" className="nav-link" >
                                                <span className="menu-icon">
                                                    <i className="mdi mdi-speedometer"><CgProfile /></i>
                                                </span>
                                                <motion.span className="menu-title">Edit Profile</motion.span>
                                            </Link>
                                        </li>
                                    </div>
                                </motion.div>
                                <div className="dropdown-divider"></div>
                                <div className="dropdown-item preview-item">
                                    <div className="preview-item-content">
                                        <li className="nav-item menu-items" onClick={() => logOutHandler()}>
                                            <Link className="nav-link">
                                                <a className="nav-link">
                                                    <motion.span className="menu-title" >Log Out</motion.span>
                                                </a>
                                            </Link>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <motion.li animate={display} className="nav-item nav-category">
                        <span className="nav-link">Navigation</span>
                    </motion.li>
                    <motion.li animate={display} className="nav-item menu-items">
                        <Link to="/Admin" className="nav-link">
                            <a className="nav-link">
                                <span className="menu-icon">
                                    <i className="mdi mdi-speedometer"><IoSpeedometerSharp /></i>
                                </span>
                                <motion.span className="menu-title">Reservation</motion.span>
                            </a>
                        </Link>
                    </motion.li>
                    <motion.li animate={display} className="nav-item menu-items">
                        <Link to="Users" className="nav-link">
                            <a className="nav-link">
                                <span className="menu-icon">
                                    <i className="mdi mdi-playlist-play"><AiOutlineUser /></i>
                                </span>
                                <motion.span className="menu-title">Users</motion.span>
                            </a>
                        </Link>
                    </motion.li>
                    {/* <li className="nav-item menu-items">
                        <Link to="Coupons" className="nav-link">
                            <a className="nav-link">
                                <span className="menu-icon">
                                    <i className="mdi mdi-table-large"><RiCoupon2Line /></i>
                                </span>
                                <motion.span className="menu-title">Coupons</motion.span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <Link to="News" className="nav-link">
                            <a className="nav-link">
                                <span className="menu-icon">
                                    <i className="mdi mdi-chart-bar"><BiNews /></i>
                                </span>
                                <motion.span className="menu-title">News</motion.span>
                            </a>
                        </Link>
                    </li> */}
                    <motion.li animate={display} className="nav-item menu-items">
                        <Link to="Reviews" className="nav-link">
                            <a className="nav-link">
                                <span className="menu-icon">
                                    <i className="mdi mdi-chart-bar"><MdRateReview /></i>
                                </span>
                                <motion.span className="menu-title">Reviews</motion.span>
                            </a>
                        </Link>
                    </motion.li>
                </motion.ul>
            </motion.nav >
            <nav className="navbar nav-bar p-0 fixed-top d-flex flex-row" >
                <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center" id="minimize">
                    <div className="arrows-con" onClick={() => sidebarHeight()}>
                        <motion.div className="down-arrow" animate={opacity1} > <AiOutlineBars className="up" /></motion.div>
                        <motion.div initial={{ opacity: "0" }} animate={opacity2} className="up-arrow"> <HiOutlineBars3CenterLeft className="down" /></motion.div>
                    </div>
                </div>
                <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
                    {/* <ul className="navbar-nav w-100" >
                        <li className="nav-item w-100">
                            <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                                <input type="text" className="form-control" placeholder="Search products" />
                            </form>
                        </li>
                    </ul> */}
                    {/* <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item dropdown border-left">
                            <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="mdi mdi-email"><AiOutlineMail /></i>
                                <span className="count bg-success"></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                                <h6 className="p-3 mb-0 h6-nav" >Messages</h6>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src={Face} alt="image" className="rounded-circle profile-pic" />
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1">Mark send you a message</p>
                                        <p className="text-muted mb-0"> 1 Minutes ago </p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src={Face} alt="image" className="rounded-circle profile-pic" />
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1">Cregh send you a message</p>
                                        <p className="text-muted mb-0"> 15 Minutes ago </p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src={Face} alt="image" className="rounded-circle profile-pic" />
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1">Profile picture updated</p>
                                        <p className="text-muted mb-0"> 18 Minutes ago </p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <p className="p-3 mb-0 text-center h6-nav" >4 new messages</p>
                            </div>
                        </li>
                        <li className="nav-item dropdown border-left">
                            <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-bs-toggle="dropdown">
                                <i className="mdi mdi-bell"><AiOutlineBell /></i>
                                <span className="count bg-danger"></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                                <h6 className="p-3 mb-0 h6-nav" >Notifications</h6>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-calendar text-success"><AiOutlineCalendar /></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject mb-1">Event today</p>
                                        <p className="text-muted ellipsis mb-0"> Just a reminder that you have an event today </p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-settings text-danger"><AiOutlineSetting /></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject mb-1">Settings</p>
                                        <p className="text-muted ellipsis mb-0"> Update dashboard </p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-link-variant text-warning"><ImAttachment /></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject mb-1">Launch Admin</p>
                                        <p className="text-muted ellipsis mb-0"> New admin wow! </p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <p className="p-3 mb-0 text-center h6-nav" >See all notifications</p>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" id="profileDropdown" href="#" data-bs-toggle="dropdown">
                                <div className="navbar-profile">
                                    <img className="img-xs rounded-circle" src={Face} alt="" />
                                    <p className="mb-0 d-none d-sm-block navbar-profile-name">admin name</p>
                                    <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="profileDropdown">
                                <h6 className="p-3 mb-0" className="h6-nav">Profile</h6>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-settings text-success"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject mb-1">Settings</p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-logout text-danger"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject mb-1">Log out</p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <p className="p-3 mb-0 text-center h6-nav">Advanced settings</p>
                            </div>
                        </li>
                    </ul> */}
                </div>
            </nav>
        </>
    )
}

export default Sidebar