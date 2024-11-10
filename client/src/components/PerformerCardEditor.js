import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

function PerformerCardEditor({ id, name, bio, email, image, setEditMode }) {
    const { onEditPerformer } = useOutletContext()

    const formSchema = yup.object({
        name: yup.string().required("Name is required.").max(25, "Name cannot exceed 25 characters."),
        bio: yup.string().required("Bio is required.").max(250, "Bio cannot exceed 250 characters."),
        email: yup.string().email("Invalid email format.").required("Email is required."),
        image: yup.string().url("Must be a valid URL.").required("Image URL is required.")
    })

   const formik = useFormik({
    initialValues: {
        name: name,
        image: image,
        bio: bio,
        email: email,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        fetch(`performers/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then(r => r.json())
        .then(data => {
            onEditPerformer(data)
            setEditMode(false)
        })
    }
})


    return (
        <li className='card'>
            <h3>Edit Performer Details</h3>

            <form onSubmit={formik.handleSubmit}>
                <label>
                    Name:
                    <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.name && <p style={{ color: 'red' }}>{formik.errors.name}</p>}
                </label>
                <br />

                <label>
                    Profile Picture URL:
                    <img src={formik.values.image}></img>
                    <input
                    type="text"
                    name="image"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.image && <p style={{ color: 'red' }}>{formik.errors.image}</p>}
                </label>
                <br />

                <label>
                    Performer Bio:
                    <textarea
                    name="bio"
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    rows="8"
                    style={{ width: "100%", resize: "vertical" }}
                    />
                    {formik.errors.bio && <p style={{ color: "red" }}>{formik.errors.bio}</p>}
                </label>
                <br />

                <label>
                    Performer Email:
                    <input
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.email && <p style={{ color: "red" }}>{formik.errors.email}</p>}
                </label>
                <br />

                <div className='button-container'>
                    <button type='submit'>Submit</button>
                    <button type='button' onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            </form>
        </li>
        )
}

export default PerformerCardEditor