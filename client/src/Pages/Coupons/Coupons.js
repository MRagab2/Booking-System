import { Button, Col, Form, Row } from "react-bootstrap"
import "./Coupons.css"
import Multiselect from "multiselect-react-dropdown"
import { useState } from "react"

const Coupons = () => {
    const [discount, setDiscount] = useState()
    const selectChange = (e) => {
        setDiscount(e.target.value)
        console.log(discount)
    }
    return (
        <>
            <div className="row ">
                <div className="col-12 grid-margin grid-margin-news">
                    <div className="card-dashboard card-dashboard-2 card-coupons-2">
                        <div className="card-body">
                            <h4 className="card-title">Make An Annoncment</h4>
                            <div className="form-news">
                                <Form className="form">
                                    <Row>
                                        <Col>
                                            <Form.Control placeholder="Title" />
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col>
                                            <Form.Control placeholder="Code" />
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col>
                                            <select class="form-select select-discount" aria-label="Default select example" onChange={(e) => selectChange(e)} >
                                                <option selected value="0">Open this select menu</option>
                                                <option value="DiscountPrice">Discount Price</option>
                                                <option value="DiscountPercentage">Discount Percentage</option>
                                            </select>
                                        </Col>
                                        {discount == "DiscountPrice" &&
                                            <Col>
                                                <Form.Control placeholder="Discount Price" style={{ minHeight: "48px" }} />
                                            </Col>}
                                        {discount == "DiscountPercentage" &&
                                            <Col>
                                                <Form.Control placeholder="Discount Percentage" />
                                            </Col>
                                        }
                                    </Row>

                                    {discount == "0" &&
                                        <span></span>}

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
                                        <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
                                            Submit
                                        </Button>
                                    </div>

                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 grid-margin">
                    <div className="card-dashboard card-dashboard-2">
                        <div className="card-body">
                            <h4 className="card-title">Coupons</h4>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th> Code</th>
                                            <th> Name</th>
                                            <th> Description </th>
                                            <th> Reduction</th>
                                            <th> Completion date </th>
                                            <th> Authorized to whom</th>
                                            <th>Delete Or Edit</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> Dashboard </td>

                                            <td> done</td>
                                            <td> +123456789</td>
                                            <td> Yes</td>
                                            <td> Yes</td>
                                            <td> Yes</td>
                                            <td>
                                                <Button className="actions-btn " variant="danger">Delete</Button>
                                            </td>

                                        </tr>
                                        <tr>

                                            <td> Website </td>

                                            <td> pending</td>
                                            <td> +123456789</td>
                                            <td> Yes</td>
                                            <td> Yes</td>
                                            <td> Yes</td>
                                            <td>
                                                <Button className="actions-btn" variant="danger">Delete</Button>
                                            </td>

                                        </tr>
                                        <tr>

                                            <td> App design </td>

                                            <td> pending</td>
                                            <td> +123456789</td>
                                            <td> Yes</td>
                                            <td> Yes</td>
                                            <td> Yes</td>
                                            <td>
                                                <Button className="actions-btn" variant="danger">Delete</Button>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td> Development </td>

                                            <td> done</td>
                                            <td> +123456789</td>
                                            <td> Yes</td>
                                            <td> Yes</td>
                                            <td> Yes</td>
                                            <td>
                                                <Button className="actions-btn" variant="danger">Delete</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> Website </td>

                                            <td> pending</td>
                                            <td> +123456789</td>
                                            <td> Yes</td>
                                            <td> Yes</td>
                                            <td> Yes</td>
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

export default Coupons