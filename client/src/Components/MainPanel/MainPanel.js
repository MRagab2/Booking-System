import "./MainPanel.css"

const MainPanel = (props) => {
    return (
        <>
            <div className="main-panel">
                {props.children}
            </div>
        </>
    )
}

export default MainPanel