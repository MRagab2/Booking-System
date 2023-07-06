import "./Container.css"

const Container = (props) => {
    return (
        <>
            <div className="container-fluid m-0 p-0">
                {props.children}
            </div>
        </>
    )
}

export default Container