import EventCard from "./EventCard";
import { AppContext } from "../context/AppContext";
import React, { useContext } from "react";

const EventList = () => {

    const { events } = useContext(AppContext)
    const sortedEvents = events.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return(
        <ul>
            {
                sortedEvents.map(event => {
                    return (
                        <EventCard 
                            key={event.id}
                            name={event.name}
                            date={event.date}
                            time={event.time}
                            venue={event.venue.name}
                            performers={event.performers}
                            hosts={event.hosts}
                        />
                    )
                })
            }
        </ul>
    )
}

export default EventList;