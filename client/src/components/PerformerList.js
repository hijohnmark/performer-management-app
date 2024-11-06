import React from "react";
import { useOutletContext } from "react-router-dom"
import PerformerCard from './PerformerCard'

function PerformerList() {
    
    const { performers } = useOutletContext()

    return (
        <>
        <h1>Featured Performers:</h1>
        <ul>
            {
                performers.map(performer => {
                    return (
                        <PerformerCard
                        key = {performer.id}
                        name = {performer.name}
                        bio = {performer.bio}
                        contact_info = {performer.contact_info} />
                    )
                })
            }

        </ul>
        </>
    )
}

export default PerformerList