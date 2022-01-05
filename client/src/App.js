import "./App.css";
import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {

    if(username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };
  return (
    <div className="App">
      <h3>Join a chat</h3>
      <input
        type="text"
        placeholder="John.."
        onChange={(event) => {
          setUsername(event.target.value); //event.target.value target and keep track on the whatever value written on the input
        }}
      />
      <input type="text" placeholder="Room id"
      onChange={(event) => {
        setRoom(event.target.value);
      }} />
      <button onClick={joinRoom}>Join a Room</button>
    </div>
  );
}

export default App;
