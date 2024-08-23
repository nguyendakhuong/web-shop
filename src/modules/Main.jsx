import { Outlet } from 'react-router-dom'
import CONFIG_USER_NAV from '../lib/configs/sidebarUserNav'
import './Main.scss'
import SidebarUser from './user/sidebarUser/SidebarUser'

const MainWeb = () => {
    return (
        <div className='layout_web'>
            <div className='header'>
                <div className='sidebarUser'>
                    <div>aaaaaaaaaaaaaa</div>
                    <SidebarUser sidebarUser={CONFIG_USER_NAV.sidebarUserNav} />
                </div>
            </div>
            <div className='body'>
                <Outlet />
            </div>
            <div className='footer'>
                Footer
            </div>
        </div>
    )
}
export default MainWeb