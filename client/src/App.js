import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { AppProvider } from "./context/AppContext";

function App() {
  
  return (
  <>
    <header>
      <NavBar />
    </header>
    <AppProvider>
      <Outlet />
    </AppProvider>
  </>
  )
}

export default App;
