import "./Header.css"

const Header = (props) => {
    return (
        <>
            <header className="header" id="home">
                {props.children}
            </header>
        </>
    )
}

export default Header