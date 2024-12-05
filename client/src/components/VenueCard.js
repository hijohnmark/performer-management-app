import React from "react"

const VenueCard = ({ name, address, capacity }) => {

    const toTitleCase = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    return (
        <li className='venue-card'>
            <h3>{toTitleCase(name)}</h3>
            <br />

            <h3>Address:</h3>
            <p>{address}</p>
            <br />

            <h3>Capacity:</h3>
            <p>{capacity}</p>
            <br />

        </li>
    )
}

export default VenueCard