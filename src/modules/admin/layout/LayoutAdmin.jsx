import { Outlet } from "react-router-dom"

import SidebarAdmin from "../sidebarAdmin/SideBarAdmin"
import CONFIG_ADMIN_NAV from "../../../lib/configs/sidebarAdminNav"
import "./LayoutAdmin.scss"

const LayoutAdmin = () => {
    return (
        <div className="layout">
            <div className="main">
                <div className="main__sidebar">
                    <SidebarAdmin sidebarAdmin={CONFIG_ADMIN_NAV.sidebarAdminNav} />
                </div>
                <div className="main__outlet">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}
export default LayoutAdmin