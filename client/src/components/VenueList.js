import React, { useContext } from "react";
import VenueCard from "./VenueCard";
import { AppContext } from "../context/AppContext"

const VenueList = () => {

    const { venues } = useContext(AppContext)

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

export default VenueList;