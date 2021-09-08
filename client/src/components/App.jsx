import React from "react";
import Chat from "./Chat.jsx";
import { io } from "socket.io-client";
function App() {
  const socket = io("http://localhost:9000", { transports: ["websocket"] });
  console.log(socket.id);
  return (
    <div className="App">
      <Chat socket={socket} />
    </div>
  );
}

export default App;
