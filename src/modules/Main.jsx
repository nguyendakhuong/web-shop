import { Outlet, useNavigate } from 'react-router-dom'
import CONFIG_USER_NAV from '../lib/configs/sidebarUserNav'
import './Main.scss'
import SidebarUser from './user/sidebarUser/SidebarUser'
import { useContext } from 'react'
import UserContext from '../lib/context/use.context'
import Button from './components/button/Button'
import APP_IMAGE from '../assets'
const MainWeb = () => {
    const [{ }, dispatch] = useContext(UserContext)
    const navigate = useNavigate()
    const roleTest = "2"

    const HandlerLogin = () => {
        navigate('/login');
    }
    const HandlerAdmin = () => {
        if (roleTest === "1") navigate('/');
        if (roleTest === "2") navigate('/admin');
    }
    return (
        <div className='layout_web'>
            <div className='header'>
                <div className='sidebarUser'>
                    <div className='logoWeb' onClick={HandlerAdmin}>K | F A S H I O N</div>
                    <SidebarUser sidebarUser={CONFIG_USER_NAV.sidebarUserNav} />
                    <div>
                        {roleTest === "1" ?
                            <div>
                                <Button title={"Đăng nhập"} onClick={HandlerLogin} />
                            </div> :
                            <div className='profile'>
                                <div className='item'>
                                    <img src={APP_IMAGE.user} alt='' />
                                </div>
                                <div className='item favorite-icon'>
                                    <img src={APP_IMAGE.favorite} alt='' />
                                    <span className='item-count'>0</span>
                                </div>
                                <div className='item cart-icon'>
                                    <img src={APP_IMAGE.cart} alt='' />
                                    <span className='item-count'>0</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='body'>
                <Outlet />
            </div>
            <div className='footer'>
                <div className='info'>
                    <div className='item'>
                        <h3>K | Fashion</h3>
                        <div className='item-page'>
                            K Fashion là thương hiệu thời trang do Nguyễn Đa Khương tạo ra
                            với hàng nghìn mẫu thiết kế. Nơi các xu hướng thời trang trên
                            thế giới được cập nhật mỗi ngày
                        </div>
                        <div className='item-page'>
                            <img src={APP_IMAGE.marker} alt='' className='image' />
                            28 Hà Nội, Phường 1, Quận Nam Từ Liêm, Tp. Hà Nội
                        </div>
                        <div className='item-page'>
                            <img src={APP_IMAGE.phone} alt='' className='image' />
                            012345789
                        </div>
                        <div className='item-page'>
                            <img src={APP_IMAGE.email} alt='' className='image' />
                            dakhuong281202@gmail.com
                        </div>
                    </div>
                    <div className='item'>
                        <h3>Liên kết</h3>
                        <div className='item-link'>Chính sách bản mật</div>
                        <div className='item-link'>Chính sách đổi trả</div>
                        <div className='item-link'>Chính sách giao hàng</div>
                        <div className='item-link'>Chính sách kiểm hàng</div>
                        <div className='item-link'>Điều khoản & Dịch vụ</div>
                        <div className='item-link'>Phương thức thanh toán</div>
                        <div className='item-link'>Chương trình khách hàng thân thiết</div>
                    </div>
                    <div className='item'>
                        <h3>Fanpage</h3>
                    </div>
                    <div className='item'>
                        <h3>Đăng ký khuyến mãi</h3>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default MainWeb