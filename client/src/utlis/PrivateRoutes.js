import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const PrivateRoutes = () => {
    const [token, setToken] = useState(Cookies.get("userToken"))
    return (
        <>
            {token ? <Outlet /> : <Navigate to="/SignInUp" />}
        </>
    )
}
export default PrivateRoutes