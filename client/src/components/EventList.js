import EventCard from "./EventCard";
import { useOutletContext } from "react-router-dom";

const EventList = () => {

    const { events } = useOutletContext()
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
                        />
                    )
                })
            }
        </ul>
    )
}

export default EventList;