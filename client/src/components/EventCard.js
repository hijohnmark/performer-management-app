import React from "react"

const EventCard = ({ name, date, time, venue }) => {

    const toTitleCase = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    return (
        <li className='card'>
            <h3>{toTitleCase(name)}</h3>
            <br />

            <h3>Date:</h3>
            <p>{date}</p>
            <br />

            <h3>Time:</h3>
            <p>{time}</p>
            <br />

            <h3>Venue:</h3>
            <p>{venue}</p>

        </li>
    )
}

export default EventCard