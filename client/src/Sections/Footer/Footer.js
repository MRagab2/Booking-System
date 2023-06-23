import "./Footer.css"
import { FiFacebook } from "react-icons/fi";
import { CiTwitter } from "react-icons/ci";



const Footer = () => {
    return (
        <>
            <div className="container-fluid footer">
                <div className="row row-footer">
                    <div className="col-6">
                        <p>Copyright
                            <script>document.write(new Date().getFullYear())</script> &copy; <a
                                href="http://www.devcrud.com" target="_blank">Mr</a>
                        </p>
                    </div>
                    <div className="col-6">
                        <div className="icon-con">
                            <span> <FiFacebook /></span>
                            <span>  <CiTwitter /></span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Footer