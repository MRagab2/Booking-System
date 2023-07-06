import ContainerScroller from "../../Components/ContainerScroller/ContainerScroller"
import Sidebar from "../../Sections/Sidebar/Sidebar"
import { MainContainerAdmin, MainPanel, ContentWrapper } from "../../Components"
import NavbarAdmin from "../../Sections/NavbarAdmin/NavbarAdmin"
import "./Admin.css"
import { Coupons, Dashboard, News, Reviews, Users } from "../"
import { Route, Routes } from "react-router-dom"
import AdminProfile from "../AdminProfile/AdminProfile"
import AdminEditProfile from "../AdminEditProfile/AdminEditProfile"

const Admin = () => {
    return (
        <>
            <ContainerScroller>
                <Sidebar />
                <MainContainerAdmin>
                    {/* <NavbarAdmin /> */}
                    <MainPanel>
                        <ContentWrapper>
                            <Routes>
                                <Route path='/' element={<Dashboard />} />
                                <Route path='Users' element={<Users />} />
                                <Route path='Coupons' element={<Coupons />} />
                                <Route path='News' element={<News />} />
                                <Route path='Reviews' element={<Reviews />} />
                                <Route path='AdminProfile' element={<AdminProfile />} />
                                <Route path='AdminEditProfile' element={<AdminEditProfile />} />
                            </Routes>
                        </ContentWrapper>

                    </MainPanel>
                </MainContainerAdmin>

            </ContainerScroller>
        </>
    )
}

export default Admin