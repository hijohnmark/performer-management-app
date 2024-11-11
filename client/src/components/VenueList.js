import VenueCard from "./VenueCard";
import { useOutletContext } from "react-router-dom";

const EventList = () => {

    const { venues } = useOutletContext()

    return(
        <ul>
            {
                venues.map(venue => {
                    return (
                        <VenueCard 
                            key={venue.id}
                            name={venue.name}
                            address={venue.address}
                            capacity={venue.capacity}
                        />
                    )
                })
            }
        </ul>
    )
}

export default EventList;