import { useEffect } from "react"
import './Button.scss'
const Button = ({
    title,
    onClick = () => { },
    buttonAuth,
    disabledBtn,
    className,
}) => {
    useEffect(() => { }, [disabledBtn])
    return (
        <button
            disabled={disabledBtn}
            className={`btn ${buttonAuth ? 'btnAuth' : ''} ${className}`}
            onClick={onClick}>
            {title}
        </button>
    )
}

export default Button