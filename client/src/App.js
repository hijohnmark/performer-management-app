import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  
const [performers, setPerformers] = useState([])


  useEffect(() => {
    fetch('http://localhost:5555/performers')
    .then(r => r.json())
    .then(data => setPerformers(data))
  } , [])

  const onAddPerformer = newPerformer => {
    setPerformers([...performers, newPerformer])
  }

  const onDeletePerformer = deletedPerformerId => {
    setPerformers(performers.filter(performer => performer.id !== deletedPerformerId))
  }

  const onEditPerformer = editedPerformer => {
    setPerformers(performers.map(performer => performer.id === editedPerformer.id ? editedPerformer :  performer)
  )}
  

  return (
  <>
    <header>
      <NavBar />
    </header>
    <Outlet context = {{ performers, onAddPerformer, onDeletePerformer, onEditPerformer }} />
  </>
  )
}

export default App;
