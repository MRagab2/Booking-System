import { ServiceComponent } from "../../Components"
import "./Service.css"

const Service = (props) => {
    return (
        <>
            {/* <!-- Service section --> */}
            <ServiceComponent>
                <div className="container text-center">
                    <h6 className="subtitle">{props.subtitle}</h6>
                    <h6 className="section-title mb-4">{props.sectionTitle}</h6>
                    <p className="mb-5 ">{props.p1}
                        <br />{props.p2}</p>
                </div>
            </ServiceComponent>
            {/* <!-- End of Sectoin --> */}
        </>
    )
}

export default Service