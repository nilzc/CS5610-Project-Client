import {Outlet} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <>
      <NavigationBar/>
      <div className={"container"}>
          <Outlet/>
      </div>
    </>
  );
}

export default App;
