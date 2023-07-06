import { Link, useNavigate } from "react-router-dom"
import "./EditProfile.css"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { BaseUrl } from "../../assets/Data"

const EditProfile = () => {
    const [IMG, setImg] = useState()
    const [base64Image, setBase64Image] = useState()
    const [passwordNotEmpty, setPasswordNotEmpty] = useState(false)
    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [emailRes, setEmailRes] = useState()
    const [fullNameRes, setFullNameRes] = useState()
    const [phoneRes, setphoneRes] = useState()
    const [image, setImage] = useState('');

    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${BaseUrl}/user/id/${Cookies.get("userId")}`,
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            })
            .then(res => {
                console.log(res)
                setImg(res.data.avatar)
                setEmailRes(res.data.email)
                setFullNameRes(res.data.fullName)
                setphoneRes(res.data.phone)

            })
            .catch(err => {
                console.log(err)
            })
    }, [email]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('avatar', image);
        formData.append('email', email);
        formData.append('fullName', fullName);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('passwordConfirm', passwordConfirm);

        axios.put(`${BaseUrl}/user/${Cookies.get("userId")}`,
            formData,
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            })
            .then(res => {
                console.log(res)
                navigate("/Profile")
            })
            .catch(err => {
                console.log(err)
            })
    }
    // const uploadImage = async (e) => {
    //     const file = e.target.files[0];
    //     const base64 = await convertBase64(file);
    //     setBase64Image(base64)
    // };
    // const convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);

    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };

    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // };
    

    const Back = () => {
        navigate("/Profile")
    }
    return (
        <>
            <div className="container-xl px-4 mt-4 cont-edit">
                {/* <!-- Account page navigation--> */}
                <nav className="nav nav-borders">
                    <Link className="nav-link active" to="/" > Back To Home</Link>
                </nav>
                <hr className="mt-0 mb-4" />
                <div className="row">
                    <div className="col-xl-4 ">
                        {/* <!-- Profile picture card--> */}
                        <div className="card mb-4 mb-xl-0 ">
                            <div className="card-header">Profile Picture</div>
                            <div className="card-body text-center">
                                {/* <!-- Profile picture image--> */}
                                <img className="img-account-profile rounded-circle mb-2" src={IMG} alt="avatar" />
                                {/* <!-- Profile picture help block--> */}
                                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                {/* <!-- Profile picture upload button--> */}
                                <input type="file" className="btn btn-primary" onChange={(e) => setImage(e.target.files[0])} />

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-edit-profile">
                        {/* <!-- Account details card--> */}
                        <div className="card mb-4 card-profile ">
                            <div className="card-header">Account Details</div>
                            <div className="card-body">
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    {/* <!-- Form Group (username)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputUsername" style={{ color: "black", display: "flex", justifyContent: "start" }}>Full Name </label>
                                        <input className="form-control" id="inputUsername" type="text" placeholder={fullNameRes} onChange={(e) => setFullName(e.target.value)} />
                                    </div>
                                    {/* <!-- Form Group (email address)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputEmailAddress" style={{ color: "black", display: "flex", justifyContent: "start" }}>Email address</label>
                                        <input className="form-control" id="inputEmailAddress" type="email" placeholder={emailRes} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputPhone" style={{ color: "black", display: "flex", justifyContent: "start" }}>Phone number</label>
                                        <input type="text" className="form-control" id="inputPhone" placeholder={phoneRes} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    {/* <!-- Form Row        --> */}
                                    <div className="row" style={{ marginBottom: "10px" }}>
                                        <div className="col">
                                            <label className="small mb-1" htmlFor="inputEmailAddress" style={{ color: "black", display: "flex", justifyContent: "start" }}>Password</label>
                                            <input type="password" className="form-control" placeholder="Password" minlength="8" aria-label="Password" onChange={(e) => {
                                                setPasswordNotEmpty(true)
                                                setPassword(e.target.value)
                                            }} />
                                        </div>
                                        <div className="col">
                                            <label className="small mb-1" htmlFor="inputEmailAddress" style={{ color: "black", display: "flex", justifyContent: "start" }}>Confirm Password</label>
                                            <input type="password" className="form-control" placeholder="Confirm Password" minlength="8" aria-label="Confirm Password" onChange={(e) => setPasswordConfirm(e.target.value)} required={passwordNotEmpty ? true : false} />
                                        </div>
                                    </div>


                                    <div className="row gx-3 mb-3" >
                                        <div className="col-md-6">
                                            <div className="col-md-6" style={{ display: "flex", justifyContent: "start", alignItems: "end" }}>
                                                <button className="btn btn-primary" type="submit">Save </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6" style={{ display: "flex", justifyContent: "end", alignItems: "end" }}>
                                            <button className="btn btn-primary" style={{ background: "black", border: "none" }} onClick={() => Back()}>Back</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile