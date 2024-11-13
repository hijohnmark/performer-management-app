import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import PerformerCard from "./PerformerCard";

const LandingPage = () => {
    const { performers } = useOutletContext();
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

        <p>To view a list of upcoming events, click Events.</p>
        <br />

        <p>To manage performers, events, and venues, click Manage.</p>
        <br />

        <h3>Featured Performer:</h3>
        <PerformerCard 
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