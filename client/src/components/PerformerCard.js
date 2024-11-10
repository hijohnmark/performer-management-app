import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import PerformerCardEditor from './PerformerCardEditor'

function PerformerCard({ id, name, bio, email, image }) {
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
            />
        ) : (
            <li className='card'>
            <h3>{name}</h3>
            <br></br>

            <img src={image} alt={`${name}'s profile picture`}/>
            <br></br>
            <br></br>

            <h3>Bio:</h3>
            <p>{bio}</p>
            <br></br>

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