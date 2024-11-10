import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

function PerformerCardEditor({ id, name, bio, email, image }) {
    const { onEditPerformer } = useOutletContext()

    const formSchema = yup.object({
        editedName: yup.string().required("Name is required.").max(25, "Name cannot exceed 25 characters."),
        editedBio: yup.string().required("Bio is required.").max(250, "Bio cannot exceed 250 characters."),
        editedEmail: yup.string().email("Invalid email format.").required("Email is required."),
        editedImage: yup.string().url("Must be a valid URL.").required("Image URL is required.")
    })

   const formik = useFormik({
    initialValues: {
        editedName: name,
        editedImage: image,
        editedBio: bio,
        editedEmail: email,
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
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
            resetForm()
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
                    name="editedName"
                    value={formik.values.editedName}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.editedName && <p style={{ color: 'red' }}>{formik.errors.editedName}</p>}
                </label>
                <br />

                <label>
                    Profile Picture URL:
                    <img src={formik.values.editedImage}></img>
                    <input
                    type="text"
                    name="editedImage"
                    value={formik.values.editedImage}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.editedImage && <p style={{ color: 'red' }}>{formik.errors.editedImage}</p>}
                </label>
                <br />

                <label>
                    Performer Bio:
                    <textarea
                    name="editedBio"
                    value={formik.values.editedBio}
                    onChange={formik.handleChange}
                    rows="6"
                    style={{ width: "100%", resize: "vertical" }}
                    />
                    {formik.errors.editedBio && <p style={{ color: "red" }}>{formik.errors.editedBio}</p>}
                </label>
                <br />

                <label>
                    Performer Email:
                    <input
                    type="text"
                    name="editedEmail"
                    value={formik.values.editedEmail}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.editedEmail && <p style={{ color: "red" }}>{formik.errors.editedEmail}</p>}
                </label>
                <br />

                <div className='button-container'>
                    <button type='submit'>Submit</button>
                    <button type='button'>Cancel</button>
                </div>
            </form>
        </li>
        )
}

export default PerformerCardEditor