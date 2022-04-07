import {Outlet} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
      <div className={"container"}>
          <NavigationBar/>
          <Outlet/>
      </div>
  );
}

export default App;
