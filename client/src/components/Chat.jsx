import React,{useState} from "react";
import Contact from "./Contacts.jsx";
import Msg from "./Msg.jsx";
import Side from "./side.jsx"
const axios = require('axios').default;
function Chat(props) {
    const [id,setId] = useState(0);
    const [member,setMember] = useState({});
    const [data,setData] = useState([]);
    async function passId(key) {
        setId(key);
        console.log(key);
       await  axios
            .get("http://localhost:9000/getmsg/"+key)
            .then((res)=> {
                
                    console.log(res.data);
                    setData(res.data);
                
            })
    }
    function person(data) {
        setMember(data);
    }
    return(
        <div className="outer">
            <Contact click={passId} click2={person} socket={props.socket}/>
            {id===0&&<Side />}
            {id!==0&&<Msg data={data} member={member} id={id} socket={props.socket}/>}
        </div>
    );

}
export default Chat;