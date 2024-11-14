import React from "react"

const EventCard = ({ name, date, time, venue, performers, hosts }) => {

  

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
            <br />

            <h3>Hosting:</h3>
            <ul>
                {hosts.map(host => <li key={host.id}>{host.name}</li>)}
            </ul>

        </li>
    )
}

export default EventCard