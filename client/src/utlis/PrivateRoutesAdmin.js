import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const PrivateRoutesAdmin = () => {
    const [role, setRole] = useState(Cookies.get("userRole"))
    return (
        <>
            {role == "admin" ? <Outlet /> : <Navigate to="/SignInUp" />}
        </>
    )
}
export default PrivateRoutesAdmin