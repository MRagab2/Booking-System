import "./ServiceComponent.css"

const ServiceComponent = (props) => {
    return (
        <>
            <section id="service" class="section ">
                {props.children}
            </section>
        </>
    )
}

export default ServiceComponent