import React, { useContext } from "react";
import { AppContext } from "../context/AppContext"
import PerformerCard from './PerformerCard'

function PerformerList() {
    
    const { performers } = useContext(AppContext)

    return (
        <>
        <ul>
            {
            performers.map(performer => {
                return (
                    <PerformerCard 
                    key={performer.id}
                    id={performer.id}
                    name={performer.name}
                    image={performer.image}
                    bio={performer.bio}
                    email={performer.email}
                    performerType={performer.type.name}
                    events={performer.events} />
                    )
                })
            }
        </ul>
        </>   
        
    )
}

export default PerformerList