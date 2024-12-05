import React, { useContext } from "react"
import EventList from "./EventList"
import { useFormik } from "formik"
import * as yup from "yup"
import { AppContext } from "../context/AppContext";

const EventForm = () => {
    const { onAddEvent, venues, performers } = useContext(AppContext)

    const formSchema = yup.object().shape({
        name: yup
          .string()
          .required("Must enter a name.")
          .max(250, "Name must not exceed 250 characters."),
        date: yup
          .date()
          .required("Must select a date.")
          .min(new Date(), "Date cannot be in the past."),
        time: yup
          .string()
          .required("Must enter a time.")
      });

    const formik = useFormik({
        initialValues: {
            name: "",
            date: "",
            time: "",
            venue_id: venues.length > 0 ? venues[0].id : "",
            performer_ids: [],
            host: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {

            fetch("http://localhost:5555/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            .then(r => r.json())
            .then(data => {
                onAddEvent(data)
                resetForm()
            })
        }
    })

    return (
        <>
        <div className="new-performer-form">
            <h1>Add a new event:</h1>
            <br></br>
            <form 
            onSubmit={formik.handleSubmit} 
            className="event-form"
            >

                <label htmlFor="name">
                    Event Name
                    <br />
                    <input 
                        id="name"
                        type="text" 
                        name="name" 
                        placeholder="Add event name"
                        value={formik.values.name} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: "50%" }}
                    />
                    {formik.touched.name && formik.errors.name && <p style={{ color: 'red' }}>{formik.errors.name}</p>}
                </label>
                <br/>

                <label htmlFor="date">
                    Event Date
                    <input
                        id="date"
                        type="date" 
                        name="date" 
                        placeholder="YYYY-MM-DD"
                        value={formik.values.date} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: "20%" }}
                    />
                    {formik.touched.date && formik.errors.date && <p style={{ color: 'red' }}>{formik.errors.date}</p>}
                </label>
                <br />

                <label htmlFor="time">
                    Start Time
                    <input
                        id="time"
                        type="time"
                        name="time"
                        placeholder="HH:MM"
                        value={formik.values.time}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: "10%" }}
                    />
                    {formik.touched.time && formik.errors.time && <p style={{ color: 'red' }}>{formik.errors.time}</p>}
                </label>
                <br />

                <label htmlFor="venue_id">
                    Venue
                    <br />
                    <select
                        name="venue_id"
                        value={formik.values.venue_id}
                        onChange={formik.handleChange}
                    >
                    {venues.map(venue => (
                        <option key={venue.id} value={venue.id}>
                            {venue.name}
                        </option>
                    ))}
                    </select>
                </label>
                <br />

                <label>
                Scheduled Performers:
                {performers.map((performer) => (
                    <label key={performer.id}>
                        <input
                            type="checkbox"
                            id={performer.id}
                            name="performer_ids"
                            value={performer.id}
                            onChange={formik.handleChange}
                        />
                        <span style={{ marginLeft: "20px" }}>{performer.name}</span>
                    </label>
                ))}
                </label>
                <br />

                <label htmlFor="host">
                    Choose Event Host:
                    <br />
                    <select
                        name="host"
                        value={formik.values.host}
                        onChange={formik.handleChange}>
                            <option value="">Select host</option>
                        {performers.map(performer => (
                            <option key={performer.id} value={performer.id}>
                                {performer.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />

                <button type="submit">Create New Event</button>
            </form>
        </div>


            <EventList />
        
        </>
    )
}

export default EventForm