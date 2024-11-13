import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import PerformerCardEditor from './PerformerCardEditor'

function PerformerCard({ id, name, bio, email, image, performerType, events }) {
    const [ editMode, setEditMode ] = useState(false)

    const { onDeletePerformer } = useOutletContext()

    const handleDelete = () => {
        fetch(`/performers/${id}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (response.ok) {
                onDeletePerformer(id)
            }
        })
    }

    return (
        editMode ? (
            <PerformerCardEditor
                id={id}    
                name={name}
                bio={bio}
                email={email}
                image={image}
                performerType={performerType}
                setEditMode={setEditMode} 
            />
        ) : (
            <li className='card'>
            <h3>{name}</h3>
            <br />

            <img src={image} alt={`${name}'s profile picture`}/>
            <br /><br />

            <h3>Bio:</h3>
            <p>{bio}</p>
            <br />

            <h3>Type:</h3>
            <p>{performerType}</p>
            <br />

            <h3>Email:</h3>
            <p>{email}</p>
            <br />

            <h3>Scheduled Events:</h3>
            <br />
            <ul>
            {events.map(event => 
                <li key={event.id}>
                    <strong>{event.name.replace(/\b\w/g, (char) => char.toUpperCase())}</strong>
                    <br />
                    <span>Date: {event.date}</span>
                    <br /><br />
                </li>
            )}
            </ul>

            <div className="button-container">
                <button onClick={() => setEditMode(true)}>Edit Info</button><button onClick={handleDelete}>Delete</button>
            </div>
        </li>
        )
        
    )
}

export default PerformerCard