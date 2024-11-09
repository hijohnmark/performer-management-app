import PerformerForm from "./PerformerForm"
import EventForm from "./EventForm"
import VenueForm from "./VenueForm"
import React, { useState } from "react"

const Manage = () => {

    const [ selectedOption, setSelectedOption ] = useState("")

    const handleSelectChange = e => setSelectedOption(e.target.value)

    return (
        <div>
            <br></br>
            <h1>Add a new performer, venue, or event.</h1>
            <br></br>
                <label htmlFor="mgmt-dd">Choose what you'd like to manage:
                    <select name="mgmt-dd" id="mgmt-dd" value={selectedOption} onChange={handleSelectChange}>
                        <option value="default">Select an option</option>
                        <option value="performers">Performers</option>
                        <option value="events">Events</option>
                        <option value="venues">Venues</option>
                    </select>
                </label>
                <br></br>
            {selectedOption === "performers" && <PerformerForm />}
            {selectedOption === "events" && <EventForm />}
            {selectedOption === "venues" && <VenueForm />}
        </div>
    )
}

export default Manage