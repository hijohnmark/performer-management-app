import React, {useState} from "react"
import PerformerList from "./PerformerList"
import { useFormik } from "formik"
import * as yup from "yup"
import { useOutletContext } from "react-router-dom"

const EventForm = () => {
    const { onAddEvent } = useOutletContext()

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
          .matches(
            /^([0-9]{2}):([0-9]{2})$/, 
            "Time must be in HH:MM format."
          )
      });
      

    const formik = useFormik({
        initialValues: {
            name: "",
            date: "",
            time: "",
            venue_id: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("events", {
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
            <h1>Add a new performer to your lineup:</h1>
            <br></br>
            <form 
            onSubmit={formik.handleSubmit} 
            className="form"
            >

                <label htmlFor="name">
                    Performer Name
                    <br />
                    <input 
                        id="name"
                        type="text" 
                        name="name" 
                        placeholder="Add name"
                        value={formik.values.name} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: "50%" }}
                    />
                    {formik.touched.name && formik.errors.name && <p style={{ color: 'red' }}>{formik.errors.name}</p>}
                </label>
                <br/>

                <label htmlFor="image">
                    Profile Picture
                    <input
                        id="image"
                        type="text" 
                        name="image" 
                        placeholder="Add a profile picture URL"
                        value={formik.values.image} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.image && formik.errors.image && <p style={{ color: 'red' }}>{formik.errors.image}</p>}
                </label>
                <br />

                <label htmlFor="bio">
                    Bio
                    <textarea
                        id="bio"
                        name="bio"
                        placeholder="Add performer bio"
                        value={formik.values.bio}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows="4"
                        style={{ width: "100%", resize: "none" }}
                    />
                    {formik.touched.bio && formik.errors.bio && <p style={{ color: 'red' }}>{formik.errors.bio}</p>}
                </label>
                <br />

                <label htmlFor="performer_type_id">
                    Performer Type
                    <br />
                    <select
                        name="performer_type_id"
                        value={formik.values.performer_type_id}
                        onChange={formik.handleChange}
                    >
                    {performerTypes.map(type => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                    </select>
                </label>
                <br />

                <label htmlFor="email">
                    Email
                    <br />
                    <input
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Add email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: "50%" }}
                    />
                    {formik.touched.email && formik.errors.email && <p style={{ color: 'red' }}>{formik.errors.email}</p>}
                </label>
                <br />
                <button type="submit">Submit New Performer</button>
            </form>
        </div>

        {/* <div className="add-delete-performers">
            <br></br>
            <h1>Edit or delete a performer:</h1>
            <PerformerList />
        </div> */}
        </>
    )
}

export default EventForm