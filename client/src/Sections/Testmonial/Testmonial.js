import "./Testmonial.css"
import { Carousel, TestmonialComponent } from "../../Components"

const Testmonial = () => {

    return (
        <>
            {/* <!-- Testmonial Section --> */}
            <TestmonialComponent>
                <div className="container text-center">
                    <h6 className="subtitle">Testmonial</h6>
                    <h6 className="section-title mb-4">What People Say About Me</h6>
                    <p className="mb-5 pb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. In alias dignissimos. <br />
                        rerum commodi corrupti, temporibus non quam.</p>
                    <Carousel pending="unhidden" />
                </div>
            </TestmonialComponent>
            {/* <!-- End of testmonial section --> */}
        </>
    )
}

export default Testmonial