import React, {useState} from "react"
import PerformerList from "./PerformerList"
import { useFormik } from "formik"
import * as yup from "yup"
import { useOutletContext } from "react-router-dom"

const PerformerForm = () => {
    // const [ name, setName ] = useState("")
    // const [ image, setImage ] = useState("")
    // const [ bio, setBio ] = useState("")
    // const [ email, setEmail ] = useState("")

    const { onAddPerformer } = useOutletContext()

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name.").max(25, "Name must not exceed 25 characters."),
        image: yup.string().url("Must be a valid URL.").required("Must enter an image URL."),
        bio: yup.string().required("Must enter a performer bio.").max(250, "Bio must not exceed 250 characters."),
        email: yup.string().email("Invalid email format.").required("Must enter a valid email address.")
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
            bio: "",
            email: "",
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

    // const handleSubmit = e => {
    //     e.preventDefault()
    //     const performerData = {
    //         name: name,
    //         image: image,
    //         bio: bio,
    //         contact_info: email
    //     }
    //     console.log(performerData)

    //    fetch('/performers', {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(performerData)
    //    })
    //    .then(r => r.json())
    //    .then(newPerformer => onAddPerformer(newPerformer))

    // setName("")
    // setImage("")
    // setBio("")
    // setEmail("") 
    // }

    return (
        <>
        <div className="new-performer-form">
            <h1>Add a new performer to your lineup:</h1>
            <br></br>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>

                <label htmlFor="name">Performer Name</label>
                <br />
                {/* name input */}
                <input 
                id="name"
                type="text" 
                name="name" 
                placeholder="Add name"
                value={formik.values.name} 
                onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}>{formik.errors.name}</p>

                <label htmlFor="image">Profile Picture</label>
                <br />
                {/* image input */}
                <input
                id="image"
                type="text" 
                name="image" 
                placeholder="Add a profile picture URL"
                value={formik.values.image} 
                onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}>{formik.errors.image}</p>
                
                <label htmlFor="bio">Bio</label>
                <br />
                {/* bio input */}
                <input
                id="bio"
                type="text" 
                name="bio" 
                placeholder="Add performer bio"
                value={formik.values.bio} 
                onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}>{formik.errors.bio}</p>

                <label htmlFor="email">Email</label>
                <br />
                {/* email input */}
                <input
                id="email"
                type="text"
                name="email"
                placeholder="Add email"
                value={formik.values.email}
                onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}>{formik.errors.email}</p>
                <br />
                <button type="submit">Submit New Performer</button>
            </form>
        </div>

        <div className="add-delete-performers">
            <br></br>
            <h1>Edit or delete a performer:</h1>
            <PerformerList />
        </div>
        </>
    )
}

export default PerformerForm