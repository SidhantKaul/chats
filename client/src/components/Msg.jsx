import React, { useState, useEffect } from "react";
import Typefield from "./Typefield.jsx";
import { io } from "socket.io-client";

import Top from "./MsgTop";
const axios = require("axios").default;
let eid = 0;
function Msg(props) {
  const [data, setData] = useState([]);
  console.log(props.data);
  const [disp, setDisp] = useState(false);
  const [wid, Setid] = useState(props.id);
  const [channels, setChannels] = useState([]);
  // Setid(props.id);
  //console.log(wid+"iskkka"+props.id);
  useEffect(() => {
    axios.get("http://localhost:9000/getchannels").then((res) => {
      res.data.forEach((elem) => {
        if (elem.id === props.id) {
          elem.messages.push(...props.data);
        }
      });
      setChannels(res.data);
      setDisp(true);
    });
    console.log("bjdfbjkdbckjdbvkjdbvkjdf");
    setData(props.data);
    console.log(props.data);
    console.log(props.id + "@@@@@@@@@");
  }, [props.data]);
  useEffect(() => {
    axios.get("http://localhost:9000/getchannel").then((res) => {
      console.log(res.data);
      setChannels(res.data);
    });
    axios.get("http://localhost:9000/getchannels").then((res) => {
      res.data.forEach((elem) => {
        if (elem.id === props.id) {
          elem.messages.push(...props.data);
        }
      });
      setChannels(res.data);
      setDisp(true);
    });
  }, []);
  console.log(
    channels[props.id - 1] +
      "qqqqqqqqqqqqqqqqqqqqqqqqqqqqwwwwwwwwwwwwwwwwwweeeeeeeeeee"
  );
  // useEffect(()=>{
  async function msg(key) {
    let val = props.data;
    let uid = key.id;
    let time = 0;
    setChannels((prevValue) => {
      console.log(prevValue);
      prevValue.forEach((elem) => {
        if (elem.id === uid) {
          console.log(elem.id + "clickylcikcy");
          console.log(elem.messages);
          if (elem.id1 !== time) elem.messages.push(key);
          time = elem.id1;
        }
      });
      return prevValue;
    });
    console.log(">/../.?>?>?>?>?>??>>?>>>?>>>>>");
    console.log(channels);
    console.log(data);
    setData((prevValue) => {
      console.log(
        prevValue + "``````````````````````````````````````````````````````"
      );
      // let uuid;
      // if(prevValue!==[]) {
      //     console.log("ghh"+prevValue);
      //     uuid = prevValue[0].channelId;
      // }
      // let qid = key.id;
      // console.log(uuid+":::::::::::::::"+wid+":::::::::::"+eid);
      // // if(key.id===props.id) {
      //     console.log(key);
      //     console.log("trigerrrrrrrrrrrrrr");
      //     // if(props.id===key.channelId)
      //     // console.log("trigerrrrrrrrrrrrrr");
      //     if(uuid===qid||prevValue===[])
      return [...prevValue];
      // return prevValue;

      // return prevValue
    });
  }
  function date(key) {
    let d = new Date(key);
    console.log(d);
    let da = ""+d
    const date = da.substring(8,10)+"/"+da.substring(11,15);
    return date;
  }
  function time(key) {
    let d = new Date(key);
    console.log(d);
    let da = ""+d
    const time = da.substring(16,21);
    return time;
  }
  // })
  console.log(data);
  function handleFunc(elem) {
    return (
      <div className="msg-chat">
        <span className="name">{elem.senderName}: </span>
        {elem.text}
        <div className="inst">
          <p className="inst-left">{date(elem.id1)}</p>
          <p className="inst-right">{time(elem.id1)}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="msg-div">
      <Top data={props.member} id={props.id} />
      {console.log(channels[props.id - 1])}
      {props.id !== 0 &&
        channels[props.id - 1] !== undefined &&
        channels[props.id - 1].messages.map(handleFunc)}
      <Typefield func={msg} id={props.id} socket={props.socket} />
    </div>
  );
}
export default Msg;
