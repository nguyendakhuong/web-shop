import { useContext, useState } from "react";
import Button from "../../button/Button"
import Input from "../../input/Input"
import UserContext from "../../../../lib/context/use.context";
import { KEY_CONTEXT_USER } from "../../../../lib/context/use.reducer";
import APP_IMAGE from "../../../../assets";
import "./ModalEditText.scss"


const ModalEditText = () => {

    const [userCTX, dispatch] = useContext(UserContext)
    const [inputValue, setInputValue] = useState(userCTX.contentModel);
    const onClickClone = () => {
        dispatch({
            type: KEY_CONTEXT_USER.HIDE_MODAL,
        })
    }
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    return (
        <div className="modal-edit">
            <div className="iconClone">
                <i onClick={onClickClone} className="bx bx-x"></i>
            </div>
            <h1>{userCTX.titleModel ?? 'Thông báo'}</h1>
            <img className="icon" src={APP_IMAGE.iconDelete} alt="" />
            <Input value={inputValue} onChange={handleInputChange} />
            <div className="button">
                <div>
                    <Button buttonAuth={false} title={'Hủy'} onClick={onClickClone} />
                </div>
                <div>
                    <Button
                        buttonAuth={true}
                        title={'Đồng ý'}
                        onClick={() => {
                            userCTX.onClickConfirmModel(inputValue)
                            dispatch({
                                type: KEY_CONTEXT_USER.HIDE_MODAL,
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ModalEditText