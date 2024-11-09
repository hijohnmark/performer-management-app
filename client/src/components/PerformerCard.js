import React from 'react'

function PerformerCard({ name, bio, contact_info, image }) {

    return (
        <li className='card'>
            <h4>Name: {name}</h4>
            <img src={image} />
            <p>Bio: {bio}</p>
            <p>Email: {contact_info}</p>
        </li>
    )
}

export default PerformerCard