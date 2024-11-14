import React from 'react'

const FeaturedPerformerCard = ({ id, name, bio, email, image, performerType, events }) => {
    return (
        <ul>
        <li className='feature-card'>
            <h3>{name}</h3>
            <br />

            <img src={image} alt={name}/>
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
        </li>
        </ul>
    )
}

export default FeaturedPerformerCard