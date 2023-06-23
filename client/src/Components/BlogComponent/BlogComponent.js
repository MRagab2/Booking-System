import "./BlogComponent.css"

const BlogComponent = (props) => {
    return (
        <>
            <section id="blog" className="section">
                {props.children}
            </section>
        </>
    )
}

export default BlogComponent