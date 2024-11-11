import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  
const [ performers, setPerformers ] = useState([])
const [ performerTypes, setPerformerTypes ] = useState([])
const [ venues, setVenues ] = useState([])
const [ events, setEvents ] = useState([])

  useEffect(() => {
    fetch('http://localhost:5555/performers')
    .then(r => r.json())
    .then(data => setPerformers(data))
  } , [])

  useEffect(() => {
    fetch('http://localhost:5555/performer_types')
    .then(r => r.json())
    .then(data => setPerformerTypes(data))
  }, [])

  useEffect(() => {
    fetch('http://localhost:5555/venues')
    .then(r => r.json())
    .then(data => setVenues(data))
  } , [])

  useEffect(() => {
    fetch('http://localhost:5555/events')
    .then(r => r.json())
    .then(data => setEvents(data))
  } , [])

  const onAddPerformer = newPerformer => {
    setPerformers([...performers, newPerformer])
  }

  const onAddVenue = newVenue => {
    setVenues([...venues, newVenue])
  }

  const onAddEvent = newEvent => {
    setEvents([...events, newEvent])
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
    <Outlet context = {{ 
      performers, 
      performerTypes,
      events,
      venues, 
      onAddPerformer, 
      onDeletePerformer, 
      onEditPerformer, 
      onAddVenue, 
      onAddEvent 
      }} />
  </>
  )
}

export default App;
