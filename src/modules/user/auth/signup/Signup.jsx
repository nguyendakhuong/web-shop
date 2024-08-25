import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ParseValid } from "../../../../lib/validate/ParseValid"
import { Validate } from "../../../../lib/validate/Validate"
import Input from "../../../components/input/Input"
import Button from "../../../components/button/Button"
import "./Signup.scss"

const Signup = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
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
        if (name === 'name') setName(value);
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
    const HandlerBackLogin = () => {
        navigate("/login")
    }
    return (
        <div className="signup">
            <h1>Đăng ký tài khoản</h1>
            <div className="input">
                <Input
                    label={"Tên"}
                    placeholder={"Name"}
                    onChange={HandlerInput}
                    name={"name"}
                    required={true}
                    validate={'required|maxLength:10'}
                    value={name}
                    errorText={listError.name}
                    type={'text'} />
            </div>
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
                    title={"Đăng ký"}
                    buttonAuth
                    disabledBtn={isButtonDisabled}
                    onClick={handleOnClick} /></div>
            <div className="infoSignup">
                Bạn đã có tài khoản?
                <label onClick={HandlerBackLogin}> Đăng nhập ngay </label>
            </div>
        </div>
    )
}
export default Signup