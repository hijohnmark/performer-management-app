import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import PerformerCardEditor from './PerformerCardEditor'

function PerformerCard({ id, name, bio, email, image, performer_type }) {
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
                performer_type={performer_type}
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
            <p>{performer_type}</p>
            <br />

            <h3>Email:</h3>
            <p>{email}</p>

            <div className="button-container">
                <button onClick={() => setEditMode(true)}>Edit</button><button onClick={handleDelete}>Delete</button>
            </div>
        </li>
        )
        
    )
}

export default PerformerCard