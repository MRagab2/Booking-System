import "./MainContainerAdmin.css"

const MainContainerAdmin = (props) => {
    return (
        <>
            <div className="container-fluid page-body-wrapper">
                {props.children}
            </div>
        </>
    )
}

export default MainContainerAdmin