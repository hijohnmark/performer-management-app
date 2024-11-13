import React from "react"
import VenueList from "./VenueList"
import { useFormik } from "formik"
import * as yup from "yup"
import { useOutletContext } from "react-router-dom"

const EventForm = () => {
    const { onAddVenue } = useOutletContext()

    const formSchema = yup.object().shape({
        name: yup
          .string()
          .required("Must enter a name.")
          .max(250, "Name must not exceed 250 characters."),
        address: yup
          .string()
          .required("Must enter an address."),
        capacity: yup
          .number()
          .integer("Capacity must be an integer.")
          .positive("Capacity must be a positive number.")
          .required("Must enter the venue capacity.")
          .typeError("Capacity must be a number.")
      });

    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
            capacity: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("http://localhost:5555/venues", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            .then(r => r.json())
            .then(data => {
                onAddVenue(data)
                resetForm()
            })
        }
    })

    return (
        <>
        <div className="new-performer-form">
            <h1>Add a new venue:</h1>
            <br></br>
            <form 
            onSubmit={formik.handleSubmit} 
            className="form"
            >

                <label htmlFor="name">
                    Venue Name
                    <br />
                    <input 
                        id="name"
                        type="text" 
                        name="name" 
                        placeholder="Add venue name"
                        value={formik.values.name} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: "50%" }}
                    />
                    {formik.touched.name && formik.errors.name && <p style={{ color: 'red' }}>{formik.errors.name}</p>}
                </label>
                <br/>

                <label htmlFor="date">
                    Venue Address
                    <input
                        id="address"
                        type="text" 
                        name="address" 
                        placeholder="Add venue address"
                        value={formik.values.date} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: "100%" }}
                    />
                    {formik.touched.address && formik.errors.address && <p style={{ color: 'red' }}>{formik.errors.address}</p>}
                </label>
                <br />

                <label htmlFor="time">
                    Venue Capacity
                    <br />
                    <input
                        id="capacity"
                        type="text"
                        name="capacity"
                        placeholder="Enter a number"
                        value={formik.values.time}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: "20%" }}
                    />
                    {formik.touched.capacity && formik.errors.capacity && <p style={{ color: 'red' }}>{formik.errors.capacity}</p>}
                </label>
                <br />

                <br />
                <button type="submit">Create New Venue</button>
            </form>
        </div>

        <div className="view-venues">
            <br></br>
            <h1>Venues:</h1>
            <VenueList />
        </div>
        </>
    )
}

export default EventForm