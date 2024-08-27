import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import UserContext from "../../../lib/context/use.context"
import './SideBarAdmin.scss'
import { KEY_CONTEXT_USER } from "../../../lib/context/use.reducer"
const SidebarAdmin = ({ sidebarAdmin }) => {
    const [activeIndex, setAnActiveIndex] = useState(0)
    const location = useLocation()
    const [userCtx, dispatch] = useContext(UserContext)
    const navigate = useNavigate()


    useEffect(() => {
        const curPath = window.location.pathname.split('/')[2]

        const locationItem = sidebarAdmin.findIndex(item => item.section === curPath)

        setAnActiveIndex(!curPath ? 0 : locationItem)
    }, [location])

    const HandlerAdmin = () => {
        navigate('/')
    }

    return (
        <div className="sidebarAdmin">
            <div className="sidebar__menu">
                <div className='logoWebAdmin' onClick={HandlerAdmin}>K | F A S H I O N</div>
                {sidebarAdmin.map((nav, index) => (
                    <Link
                        to={nav.link}
                        key={`nav ${index}`}
                        className={`sidebar__menu__item ${activeIndex === index && 'active'
                            }`}>
                        <div className="sidebar__menu__item__txt">{nav.text}</div>
                    </Link>
                ))}
                <div className="sidebar__menu__item">
                    <div className="sidebar__menu__item__icon">
                        <i className="bx bx-log-out"></i>
                    </div>
                    <div
                        onClick={() => {
                            dispatch({
                                type: KEY_CONTEXT_USER.SET_ROLE,
                                payload: '',
                            })

                            dispatch({
                                type: KEY_CONTEXT_USER.SET_TOKEN,
                                payload: '',
                            })
                            navigate('/')
                        }}
                        className="sidebar__menu__item__txt">
                        Đăng suất
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarAdmin