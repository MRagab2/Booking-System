import "./Infos.css"

const Infos = (props) => {
    return (
        <>
            <div className="infos">
                {props.children}
            </div>
        </>
    )
}

export default Infos