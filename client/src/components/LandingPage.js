import { AppContext } from "../context/AppContext"
import React, { useState, useEffect, useContext } from "react";
import FeaturedPerformerCard from "./FeaturedPerformerCard";

const LandingPage = () => {
    const { performers } = useContext(AppContext);
    const [rp, setRp] = useState(null);

    useEffect(() => {
        if (performers.length > 0) {
            const randomPerformer = performers[Math.floor(Math.random() * performers.length)];
            setRp(randomPerformer)
        }
    }, [performers])

    if (!rp) {
        return <div>Loading featured performer...</div>;
    }
    
    return (
        <div className="padding-container">
        <h1>Welcome to Performer MGMT!</h1>
        <br /><br />

        <p>Performer MGMT allows community leaders, drag parents, venue owners, event organizers, and more to manage 
            their roster of performers, venues, and events. Keep track of upcoming events, bookings, and 
            find venues and events near you for easy planning.
        </p>
        <br />

        <p>Use the navigation links above to manage performers, events, and venues.</p>
        <br />

        <p>To see events and venues near you, click "Near Me".</p>
        <br />

        <h3>Featured Performer:</h3>
        <FeaturedPerformerCard 
        name={rp.name}
        bio={rp.bio}
        email={rp.email}
        image={rp.image}
        performerType={rp.type.name}
        events={rp.events}
        />

        </div>
    )
}

export default LandingPage