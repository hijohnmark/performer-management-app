import React from "react";
import { useOutletContext } from "react-router-dom"
import PerformerCard from './PerformerCard'

function PerformerList() {
    
    const { performers } = useOutletContext()

    if (!performers || performers.length === 0) {
        return <div>Loading...</div>;
      }

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
                                performerType={performer.type.name} />
                            )
                        })
                    }
                </ul>
        </>   
        
    )
}

export default PerformerList