import React, { useContext } from "react"
import VenueList from "./VenueList"
import { useFormik } from "formik"
import * as yup from "yup"
import { AppContext } from "../context/AppContext"

const PerformerTypeForm = () => {
    const { onAddPerformerType, performerTypes } = useContext(AppContext)

    const formSchema = yup.object().shape({
        name: yup
          .string()
          .required("Must enter a new type.")
          .max(250, "Performer type must not exceed 250 characters."),
      });

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("http://localhost:5555/performer_types", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            .then(r => r.json())
            .then(data => {
                onAddPerformerType(data)
                resetForm()
            })
        }
    })

    return (
        
        <div className="new-performer-type-form">
            <form 
            onSubmit={formik.handleSubmit} 
            className="form"
            >

                <label htmlFor="name">
                    Add a new performer type:
                    <br /><br />
                    <input 
                        id="name"
                        type="text" 
                        name="name" 
                        placeholder="Add performer type"
                        value={formik.values.name} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: "50%" }}
                    />
                    {formik.touched.name && formik.errors.name && <p style={{ color: 'red' }}>{formik.errors.name}</p>}
                </label>
                <br />
                <button type="submit">Add</button>
            </form>
        </div>

        
    )
}

export default PerformerTypeForm