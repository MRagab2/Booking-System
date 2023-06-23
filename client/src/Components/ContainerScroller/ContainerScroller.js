import "./ContainerScroller.css"

const ContainerScroller = (props) => {
    return (
        <>
            <div className="container-scroller">
                {props.children}
            </div>
        </>
    )
}

export default ContainerScroller