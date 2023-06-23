import "./AboutComponent.css"

const AboutComponent = (props) => {
    return (
        <>
            <section id="about" className="section mt-3">
                {props.children}
            </section>
        </>
    )
}

export default AboutComponent