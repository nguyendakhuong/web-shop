import { useContext } from "react";
import UserContext from "../../../lib/context/use.context";
import { KEY_CONTEXT_USER } from "../../../lib/context/use.reducer";
import ModalEditText from "./modalEditText/ModalEditText";
import "./modal.scss";
export const TYPE_MODEL = {
  DELETE_ITEM: "DELETE_ITEM",
  DETAILS: "DETAILS",
  EDIT: "EDIT",
};
const Modal = () => {
  const [{ isOpenModal, dataModal, typeModal }, dispatch] =
    useContext(UserContext);

  return (
    <div
      id="modal"
      className="modal"
      onClick={(e) => {
        if (e.target.id === "modal")
          dispatch({ type: KEY_CONTEXT_USER.HIDE_MODAL });
      }}
    >
      <div className="show-modal">
        {typeModal === TYPE_MODEL.EDIT && <ModalEditText />}
      </div>
    </div>
  );
};
export default Modal;
