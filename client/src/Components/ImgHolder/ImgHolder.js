import "./ImgHolder.css"

const ImgHolder = (props) => {
    return (
        <>
            <div className="img-holder">
                {props.children}
            </div>
        </>
    )
}

export default ImgHolder