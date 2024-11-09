
const Manage = () => {

    return (
        <>
        <br></br>
        <h1>Add a new performer, venue, or event.</h1>
        <br></br>
        <label for="mgmt-dd">Choose what you'd like to manage:</label>
        <br></br>
        <select name="mgmt-dd" id="mgmt-dd">
            <option value="default" selected="selected">Select an option to start managing:</option>
            <option value="perfomers">Performers</option>
            <option value="events">Events</option>
            <option value="venues">Venues</option>
        </select>
        </>
    )
}

export default Manage