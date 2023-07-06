import "./Widget.css"

const Widget = (props) => {
    return (
        <>
            <div className="widget">
                {props.children}
            </div>
        </>
    )
}

export default Widget