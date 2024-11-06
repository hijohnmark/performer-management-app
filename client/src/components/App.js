import React, { useEffect, useState } from "react";
import { Switch, Route, Outlet } from "react-router-dom";
import PerformerList from "./PerformerList";
import NavBar from "./NavBar";

function App() {
  
  // const [performers, setPerformers] = useState([])

  const performers = {
    name: "rodrigo",
    bio: "a handsome man.",
    contact_info: "nunya"
  }

  // useEffect(() => {
  //   fetch('/')
  //   .then(r => r.json())
  //   .then(data => setPerformers(data))
  // } , [])

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
