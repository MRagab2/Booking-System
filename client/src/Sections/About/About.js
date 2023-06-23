import { AboutComponent } from "../../Components"
import "./About.css"
import Img1 from "../../assets/Images/teacher photo.png"


const About = () => {
    return (
        <>
            {/* <!-- About section --> */}
            <AboutComponent>
                <div className="container mt-5">
                    <div className="row text-center row-about ">
                        <div className="col-md-3 col-img-about">
                            <img src={Img1} alt="" className="img-thumbnail mb-4" />
                        </div>
                        <div className="pl-md-4 pl-sm-0 col-md-9 col-about-text">
                            <h6 className="title">Mr Omara</h6>
                            <p className="subtitle">Mern Developerr</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, pariatur, aperiam aut autem voluptas odit. Odio ducimus delectus totam sed aliquam sequi praesentium mollitia, illum repudiandae quidem quod, magni magnam.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, eius, nam. Quo praesentium qui temporibus voluptatum, facilis aliquid eligendi fugiat beatae neque inventore non. Laborum repellendus consequatur ullam voluptatum asperiores.</p>
                            {/* <Link to="/Profile"><button className="btn btn-primary rounded mt-3 btn-profile-about">Profile</button></Link> */}
                        </div>
                    </div>
                </div>
            </AboutComponent>
        </>
    )
}

export default About