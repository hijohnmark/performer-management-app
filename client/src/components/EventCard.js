import React from "react"

const EventCard = ({ name, date, time, venue, performers }) => {

  

    return (
        <li className='card'>
            <h3>{name.replace(/\b\w/g, (char) => char.toUpperCase())}</h3>
            <br />

            <h3>Date:</h3>
            <p>{date}</p>
            <br />

            <h3>Time:</h3>
            <p>{time}</p>
            <br />

            <h3>Venue:</h3>
            <p>{venue}</p>
            <br />

            <h3>Scheduled Performers:</h3>
            <ul>
                {performers.map(performer => <li key={performer.id}>{performer.name}</li>)}
            </ul>

        </li>
    )
}

export default EventCard