import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  
const [performers, setPerformers] = useState([])
  // const performers = [
  //   {
  //   id: 1,
  //   name: "rodrigo",
  //   bio: "a handsome man.",
  //   contact_info: "nunya" 
  //   },
  //   {
  //     id: 2,
  //     name: "bella",
  //     bio: "a wanderer.",
  //     contact_info: "sheila@example.com"
  //   }
  // ]

  useEffect(() => {
    fetch('http://localhost:5555')
    .then(r => r.json())
    .then(data => setPerformers(data))
  } , [])

  return (
  <>
    <header>
      <NavBar />
    </header>
    <Outlet context = {{ performers }} />
  </>
  )
}

export default App;
