import { useState } from "react"
import "./SignInUp.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"
import { BaseUrl } from "../../assets/Data"



const SignInUp = () => {
    const [error, setError] = useState()
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [registerEmail, setRegisterEmail] = useState()
    const [registerPassword, setRegisterPassword] = useState()
    const [fullName, setFullName] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [phone, setPhone] = useState()
    const loginHandler = (e) => {
        e.preventDefault()
        axios.post(`${BaseUrl}/login`, { email, password })
            .then(res => {
                console.log(res)
                Cookies.set("userToken", res.data.token)
                Cookies.set("userRole", res.data.role)
                Cookies.set("userId", res.data.id)
                setError("true")
                if (Cookies.get("userRole") == "admin") {
                    window.location.assign("/e-learning/Admin")
                }
                else {
                    window.location.assign("/e-learning")
                }
            })
            .catch(err => {
                setError("false")
                console.log(err)
            })

    }
    const RegisterHandler = (e) => {
        e.preventDefault()
        axios.post(`${BaseUrl}/register`, { email: registerEmail, password: registerPassword, fullName, passwordConfirm, phone })
            .then(res => {
                Cookies.set("userToken", res.data.token)
                Cookies.set("userRole", res.data.role)
                Cookies.set("userName", res.data.fullName)
                Cookies.set("userId", res.data._id)

                navigate("/")
            })
            .catch(err => {

                console.log(err)
            })


    }
    return (
        <>
            <div className="container cont-sign">
                <div className="main">
                    <input type="checkbox" id="chk" aria-hidden="true" />
                    <div className="login">
                        <form className="form" id="loginForm" method="post" onSubmit={(e) => loginHandler(e)}>
                            <label htmlFor="chk" aria-hidden="true">Log in</label>
                            <input className="input" type="email" name="email" placeholder="Email" required="" id="loginEmail" onChange={(e) => setEmail(e.target.value)} />
                            <input className="input" type="password" name="password" minlength="8" placeholder="Password" required="" id="loginPass" onChange={(e) => setPassword(e.target.value)} />
                            {error === "true" && <div className="alert alert-success" role="alert">
                                Your Email Send Successfuly
                            </div>}
                            {error === "false" && <div className="alert alert-danger" role="alert">
                                Wrong Email Or Password
                            </div>}
                            <button id="loginBtn">Log in</button>
                        </form>
                    </div>

                    <div className="register">
                        <form className="form" id="registerForm" onSubmit={(e) => RegisterHandler(e)}>
                            <label htmlFor="chk" aria-hidden="true">Register</label>
                            <input className="input" type="text" name="fullName" placeholder="Username" required onChange={(e) => setFullName(e.target.value)} />
                            <input className="input" type="email" name="email" placeholder="Email" required onChange={(e) => setRegisterEmail(e.target.value)} />
                            <input className="input" type="password" name="password" minlength="8" placeholder="Password" required onChange={(e) => setRegisterPassword(e.target.value)} />
                            <input className="input" type="password" name="passwordConfirm" minlength="8" placeholder="Confirm Password" required
                                minLength="8" onChange={(e) => setPasswordConfirm(e.target.value)} />
                            <input className="input" type="text" name="phone" placeholder="Phone Number" required onChange={(e) => setPhone(e.target.value)} />
                            <button id="registerBtn">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInUp