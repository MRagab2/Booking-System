import { BlogComponent, Card } from "../../Components"
import "./Blog.css"

const Blog = () => {
    return (
        <>
            {/* <!-- Blog Section --> */}
            <BlogComponent>
                <div className="container text-center" id="anoucment">
                    <h6 className="section-title mb-4">Announcement</h6>
                    <p className="mb-5 pb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. In alias dignissimos. <br />
                        rerum commodi corrupti, temporibus non quam.</p>

                    <div className="row text-left">
                        <div className="col-md-4">
                            <Card classname=" border mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">English for Everyone</h5>
                                    <div className="post-details">
                                        <a href="javascript:void(0)">Posted By: Admin</a>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut ad vel dolorum, iusto velit,
                                        minima? Voluptas nemo harum impedit nisi.</p>
                                </div>
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <div className="card border mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Ahmed Saper student story</h5>
                                    <div className="post-details">
                                        <a href="javascript:void(0)">Posted By: Admin</a>

                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut ad vel dolorum, iusto velit,
                                        minima? Voluptas nemo harum impedit nisi.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">All appointments today is canceld</h5>
                                    <div className="post-details">
                                        <a href="javascript:void(0)">Posted By: Admin</a>

                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut ad vel dolorum, iusto velit,
                                        minima? Voluptas nemo harum impedit nisi.</p>
                                    {/* <!-- <a href="javascript:void(0)">Read More..</a> --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BlogComponent>
        </>
    )
}

export default Blog