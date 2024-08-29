import { RouterProvider } from "react-router-dom";
import AppRoute from "./route";
import { useContext } from "react";
import UserContext from "./lib/context/use.context";
import Modal from "./modules/components/modal/modal";

function App() {
  const [{ isOpenModal, language }, dispatch] = useContext(UserContext);
  return (
    <div>
      <RouterProvider router={AppRoute(1, true)} />
      {isOpenModal && <Modal />}
    </div>
  );
}

export default App;
