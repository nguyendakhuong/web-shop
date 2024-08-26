import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import UserContext from "../../../lib/context/use.context"
import './SidebarUser.scss'
const SidebarUser = ({ sidebarUser }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const location = useLocation()
    const [{ }, dispatch] = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[2]

        const locationItem = sidebarUser.findIndex(item => item.section === curPath)

        setActiveIndex(!curPath ? 0 : locationItem)

    }, [location])
    return (
        <div className="sidebarUser">
            <div className="sidebar__menu">
                {sidebarUser.map((nav, index) => (
                    <Link
                        to={nav.link}
                        key={`nav ${index}`}
                        className={`sidebar__menu__item ${activeIndex === index && 'active'
                            }`}>
                        <div className="sidebar__menu__item__txt">{nav.text}</div>
                    </Link>
                ))}

            </div>
        </div>
    )
}

export default SidebarUser