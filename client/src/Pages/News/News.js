import { Button, Form } from "react-bootstrap"
import "./News.css"
import Multiselect from "multiselect-react-dropdown"

const News = () => {

    return (
        <>
            <div className="row ">
                <div className="col-12 grid-margin grid-margin-news">
                    <div className="card-dashboard card-dashboard-2 card-news-2">
                        <div className="card-body">
                            <h4 className="card-title">Make An Annoncment</h4>
                            <div className="form-news">
                                <Form className="form">
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Control type="email" placeholder="Title" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Control as="textarea" rows={10} style={{ height: "200px" }} placeholder="Content" />
                                    </Form.Group>
                                    <div className="privacy-con">
                                        <div class="form-check" style={{ marginBottom: "10px" }}>
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label class="form-check-label" for="flexCheckDefault" style={{ display: "inline" }}>
                                                send to all
                                            </label>
                                        </div>
                                        <Multiselect
                                            options={[{ name: 'Option 1', id: 1 }, { name: 'Option 2', id: 2 }, { name: 'Option 3', id: 3 }, { name: 'Option 4', id: 4 }]} // Options to display in the dropdown
                                            displayValue="name"

                                        />
                                    </div>
                                    <div className="btn-privacy">
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row ">
                <div className="col-12 grid-margin ">
                    <div className="card-dashboard card-dashboard-2 ">
                        <div className="card-body">
                            <h4 className="card-title">News</h4>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th> Name</th>
                                            <th> Content </th>
                                            <th> Privacy</th>
                                            <th>View</th>
                                            <th>Delete Or Edit</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> Dashboard </td>
                                            <td> done</td>
                                            <td> +123456789</td>
                                            <td >
                                                <Button className="actions-btn action-green">View</Button>
                                            </td>
                                            <td>
                                                <Button className="actions-btn " variant="danger">Delete</Button>
                                            </td>

                                        </tr>
                                        <tr>

                                            <td> Website </td>

                                            <td> pending</td>
                                            <td> +123456789</td>
                                            <td >
                                                <Button className="actions-btn action-green">View</Button>
                                            </td>
                                            <td>
                                                <Button className="actions-btn" variant="danger">Delete</Button>
                                            </td>

                                        </tr>
                                        <tr>

                                            <td> App design </td>

                                            <td> pending</td>
                                            <td> +123456789</td>
                                            <td >
                                                <Button className="actions-btn action-green">View</Button>
                                            </td>
                                            <td>
                                                <Button className="actions-btn " variant="danger">Delete</Button>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td> Development </td>

                                            <td> done</td>
                                            <td> +123456789</td>
                                            <td >
                                                <Button className="actions-btn action-green">View</Button>
                                            </td>
                                            <td>
                                                <Button className="actions-btn" variant="danger">Delete</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> Website </td>

                                            <td> pending</td>
                                            <td> +123456789</td>
                                            <td >
                                                <Button className="actions-btn action-green">View</Button>
                                            </td>
                                            <td>
                                                <Button className="actions-btn" variant="danger">Delete</Button>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default News