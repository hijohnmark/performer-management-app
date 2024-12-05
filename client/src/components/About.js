import { AppContext } from "../context/AppContext"
import React, { useState, useEffect, useContext } from "react";
import FeaturedPerformerCard from "./FeaturedPerformerCard";

const About = () => {
    
    return (
        <div className="padding-container">
        <h1>About Performer MGMT</h1>
        <br /><br />

        <p>Performer MGMT was created by John Mark Harrell.</p>
        <br />

        <p>Website: <a href="https://hijohnmark.com/">hijohnmark.com</a></p>
        <br />

        <p>LinkedIn: <a href="https://linkedin.com/in/hijohnmark">linkedin.com/in/hijohnmark</a></p>
        <br />

        </div>
    )
}

export default About