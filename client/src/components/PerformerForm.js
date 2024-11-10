import React, {useState} from "react"
import PerformerList from "./PerformerList"
import { useOutletContext } from "react-router-dom"

const PerformerForm = () => {
    const [ name, setName ] = useState("")
    const [ image, setImage ] = useState("")
    const [ bio, setBio ] = useState("")
    const [ email, setEmail ] = useState("")

    const { onAddPerformer } = useOutletContext()

    const handleSubmit = e => {
        e.preventDefault()
        const performerData = {
            name: name,
            image: image,
            bio: bio,
            contact_info: email
        }
        console.log(performerData)
    //    fetch('/performers', {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(performerData)
    //    })
    //    .then(r => r.json())
    //    .then(newPerformer => onAddPerformer(newPerformer))
    setName("")
    setImage("")
    setBio("")
    setEmail("") 
    }

    return (
        <>
        <div className="new-performer-form">
            <h1>Add a new performer to your lineup:</h1>
            <br></br>
            <form onSubmit={handleSubmit}>
                
                {/* name input */}
                <input 
                type="text" 
                name="name" 
                placeholder="Add name"
                value={name} 
                onChange={e => setName(e.target.value)}
                />
                <br></br>
                {/* image input */}
                <input
                type="text" 
                name="image" 
                placeholder="Add a profile picture URL"
                value={image} 
                onChange={e => setImage(e.target.value)}
                />
                <br></br>
                {/* bio input */}
                <input
                type="text" 
                name="bio" 
                placeholder="Add performer bio"
                value={bio} 
                onChange={e => setBio(e.target.value)}
                />
                <br></br>
                {/* email input */}
                <input
                type="text"
                name="email"
                placeholder="Add email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <br></br>
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