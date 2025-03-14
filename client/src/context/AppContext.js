import React, { useEffect, useState, createContext } from 'react';

const AppContext = createContext()

function AppProvider({ children }) {
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
    

    const onAddPerformerType = newType => {
    setPerformerTypes([...performerTypes, newType])
    }

    const onDeletePerformer = deletedPerformerId => {
    setPerformers(performers.filter(performer => performer.id !== deletedPerformerId))
    }

    const onEditPerformer = editedPerformer => {
    setPerformers(performers.map(performer => performer.id === editedPerformer.id ? editedPerformer :  performer)
    )}

    return (
        <AppContext.Provider value={{
            performers, 
            performerTypes,
            events,
            venues, 
            onAddPerformer, 
            onDeletePerformer, 
            onEditPerformer, 
            onAddVenue, 
            onAddEvent,
            onAddPerformerType 
        }}>
            {children}
        </AppContext.Provider>
    )

}

export { AppContext, AppProvider }