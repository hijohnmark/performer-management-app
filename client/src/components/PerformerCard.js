import React from 'react'

function PerformerCard({ name, bio, email, image }) {

    return (
        <li className='card'>
            <h4>Name: {name}</h4>
            <br></br>

            <img src={image} />
            <br></br>
            <br></br>

            <h3>Bio:</h3>
            <p>{bio}</p>
            <br></br>

            <h3>Email:</h3>
            <p>{email}</p>

            <div className="button-container">
                <button>Edit</button><button>Delete</button>
            </div>
        </li>
    )
}

export default PerformerCard