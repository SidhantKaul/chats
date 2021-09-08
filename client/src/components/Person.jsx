import React, { useState, useEffect } from "react";
import img1 from "../global.png";
import img2 from "../shrek.jpg";
import img3 from "../cat.jpg";
import { io } from "socket.io-client";
import MessageIcon from "@material-ui/icons/Message";
const SERVER = "http://127.0.0.1:9000";
const arr = [img1, img2, img3];
const axios = require("axios").default;
function Contact(props) {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [channels, setChannels] = useState([]);
  const [id, setId] = useState();
  useEffect(() => {
    axios.get("http://localhost:9000/getchannel").then((res) => {
      setChannels(res.data.channels);
      // console.log(res.data.channels);
      // setImg(res.data.channels[0].img);
      // setName(""+res.data.channels[0].name);
      // setId(res.data.channels[0].id);
    });
  }, []);
  console.log(img);
  async function handleClick(e) {
    e.stopPropagation();
    await props.socket.emit("channel-join", id, (ack) => {});
    let id2 = e.target.id;
    console.log(id2);
    await props.click(e.target.id);
  }
  function iterat(elem, index) {
    return (
      <div className="flex-person">
        <div className="item-1">
          <img className="person-img" src={arr[index]} alt="img" />
        </div>
        <div className="item-2">
          <h3>{elem.name}</h3>
        </div>
        {console.log(elem.id)}
        <div
          id={elem.id}
          onClick={async (e) => {
            await props.socket.emit("channel-join", elem.id, (ack) => {});
            let id2 = e.target.id;
            console.log(elem.id);
            await props.click(elem.id);
            await props.click2(elem);
          }}
          className="msg-icon item-3"
        >
          <MessageIcon />
        </div>
      </div>
    );
  }
  return <div className="person">{channels.map(iterat)}</div>;
}

export default Contact;
