import React from "react";
import { useOutletContext } from "react-router-dom"
import PerformerCard from './PerformerCard'

function PerformerList() {
    
    const { performers } = useOutletContext()

    return (
        <>
                <ul>
                    {
                        performers.map(performer => {
                            return (
                                <PerformerCard 
                                key={performer.id}
                                name={performer.name}
                                image={performer.image}
                                bio={performer.bio}
                                email={performer.email} />
                            )
                        })
                    }
                </ul>
        </>   
        
    )
}

export default PerformerList