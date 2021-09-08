import React, { useState,useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { io } from "socket.io-client";
import SendIcon from "@material-ui/icons/Send";
function Typefield(props) {
    console.log(props.id);
  const [text, setText] = useState("");
  const [name,setName] = useState("");
  let io = props.socket;
  console.log(props.id);
  useEffect(()=> {
    io.on("chat", (data) => {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      console.log(data);
       props.func(data);
    
    });
  },[])
  
  
  async function handleClick() {
    let i = 0;
    let obj = {};
    await io.emit("chat", {
      id: props.id,
      text,
      senderName: name,
      id1: Date.now(),
    });
    
    console.log(obj);

    setText("");
  }
  function handleChange(e) {
    let val = e.target.value;
    setText(val);
  }
  function handleChange1(e) {
    let val = e.target.value;
    setName(val);
  }
  return (
    <div className="type-box">
      <Form.Control onChange={handleChange1} value={name}  style={{ border: "1px solid #3F3F44",marginBottom:"10px" }} className="name-box shadow-none" type="text" placeholder="Your name" />
      <InputGroup className="mb-3 shadow-none">
        <FormControl
          style={{ border: "1px solid #3F3F44" }}
          className="shadow-none"
          placeholder="Type your message."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={text}
          onChange={handleChange}
        />
        <Button
          onClick={handleClick}
          style={{ backgroundColor: "#CCEABB", border: "1px solid #3F3F44" }}
          variant="outline-secondary shadow-none"
          id="button-addon2"
          name={props.id}
        >
          <SendIcon style={{ color: "#3F3F44" }} />
        </Button>
      </InputGroup>
    </div>
  );
}

export default Typefield;
