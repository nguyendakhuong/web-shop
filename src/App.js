import { RouterProvider } from "react-router-dom";
import AppRoute from "./route";

function App() {
  return (
    <div>
      <RouterProvider router={AppRoute(1, true)} />
    </div>
  );
}

export default App;
