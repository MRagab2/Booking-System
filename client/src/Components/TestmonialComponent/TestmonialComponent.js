import "./TestmonialComponent.css"

const TestmonialComponent = (props) => {
    return (
        <>
            <section id="testmonial" className="section">
                {props.children}
            </section>
        </>
    )
}

export default TestmonialComponent