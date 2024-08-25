import { useState } from "react"
import Button from "../../../components/button/Button"
import Input from "../../../components/input/Input"
import './Login.scss'
import { ParseValid } from "../../../../lib/validate/ParseValid"
import { Validate } from "../../../../lib/validate/Validate"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [listError, setListError] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [formValue, setFormValue] = useState({
        name: null,
        email: null,
        password: null,
    });

    const HandlerInput = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        const inputValue = value.trim();
        const valid = e.target.getAttribute('validate');
        const validObject = ParseValid(valid);
        const error = Validate(name, inputValue, validObject);
        const newListError = { ...listError, [name]: error };
        setListError(newListError);
        setFormValue({ ...formValue, [name]: inputValue });

        if (Object.values(newListError).some(i => i)) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }

    }
    const handleOnClick = () => {

    }
    const HandlerSignUp = () => {
        navigate("/signup")
    }
    return (
        <div className="login">
            <h1>Đăng nhập</h1>
            <div className="input">
                <Input
                    label={"Email"}
                    placeholder={"Email"}
                    onChange={HandlerInput}
                    name={"email"}
                    required={true}
                    validate={'required|regEmail'}
                    value={email}
                    errorText={listError.email}
                    type={'text'} />
            </div>
            <div className="input">
                <Input
                    label={"Password"}
                    placeholder={"Password"}
                    onChange={HandlerInput}
                    name={"password"}
                    required={true}
                    validate={'required'}
                    value={password}
                    errorText={listError.password}
                    type={'password'} />
            </div>
            <div className="button">
                <Button
                    title={"Đăng nhập"}
                    buttonAuth
                    disabledBtn={isButtonDisabled}
                    onClick={handleOnClick} /></div>
            <div>
                gg
            </div>
            <div className="infoLogin">
                <label> Quên mật khẩu? </label>
                hoặc
                <label onClick={HandlerSignUp}> Đăng ký </label>
            </div>
        </div>
    )
}
export default Login