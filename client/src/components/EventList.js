import EventCard from "./EventCard";
import { useOutletContext } from "react-router-dom";

const EventList = () => {

    const { events } = useOutletContext()

    return(
        <ul>
            {
                events.map(event => {
                    return (
                        <EventCard 
                            key={event.id}
                            name={event.name}
                            date={event.date}
                            time={event.time}
                            venue={event.venue.name}
                        />
                    )
                })
            }
        </ul>
    )
}

export default EventList;