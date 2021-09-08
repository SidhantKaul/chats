import React from "react";
import Contacts from "./Person.jsx"

function Contact(props) {
    return(
        <div className="contact">
            <h3 className="just-contact">Contacts</h3>
            <Contacts click={props.click} click2={props.click2} socket={props.socket}/>
        </div>
    );
}

export default Contact;