import "./HeadSection.css"
import { Header, Infos, ImgHolder, Widget } from "../../Components"
import Img1 from "../../assets/Images/onilne courser.jpg"
import { Link } from "react-router-dom"

const HeadSection = () => {
    return (
        <>
            {/* <!-- Page Header --> */}
            <Header>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-md-6 col-sm-12">
                            <Infos>
                                <h6 className="subtitle">Hello,I'm</h6>
                                <h6 className="title">Mr Omara</h6>
                                <p>Mern Developer</p>
                                <div className="buttons pt-3">
                                    <Link to="/Book"><button className="btn btn-dark rounded">Book Now</button></Link>
                                </div>

                                <div className="socials mt-4">
                                    <a className="social-item" href="javascript:void(0)"><i className="ti-facebook"></i></a>

                                    <a className="social-item" href="javascript:void(0)"><i className="ti-twitter"></i></a>
                                </div>
                            </Infos>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <ImgHolder>
                                <img src={Img1} alt="" />
                            </ImgHolder>
                        </div>
                    </div>
                </div>
                {/* <!-- Header-widget --> */}
                <Widget>
                    <div className="widget-item">
                        <h2>124</h2>
                        <p>Happy Clients</p>
                    </div>

                    <div className="widget-item">
                        <h2>124</h2>
                        <p>Certificate out</p>
                    </div>
                </Widget>
            </Header>
            {/* <!-- End of Page Header --> */}
        </>
    )
}

export default HeadSection