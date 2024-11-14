import React from "react"
import PerformerList from "./PerformerList"
import { useFormik } from "formik"
import * as yup from "yup"
import { useOutletContext } from "react-router-dom"
import PerformerTypeForm from "./PerformerTypeForm"

const PerformerForm = () => {

    const { onAddPerformer, performerTypes } = useOutletContext()

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name.").max(50, "Name must not exceed 50 characters."),
        image: yup.string().url("Must be a valid URL.").required("Must enter an image URL."),
        bio: yup.string().required("Must enter a performer bio.").max(500, "Bio must not exceed 500 characters."),
        email: yup.string().email("Invalid email format.").required("Must enter a valid email address.")
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
            bio: "",
            email: "",
            performer_type_id: performerTypes[0].id 
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("performers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            .then(r => r.json())
            .then(data => {
                onAddPerformer(data)
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

        <div>
        <PerformerTypeForm />
        </div>

        <div className="add-delete-performers">
            <br></br>
            <h1>Manage Performers:</h1>
            <PerformerList />
        </div>
        </>
    )
}

export default PerformerForm