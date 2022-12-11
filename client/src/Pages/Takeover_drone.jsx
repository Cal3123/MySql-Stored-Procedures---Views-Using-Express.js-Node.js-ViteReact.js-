import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, Drone, UsernameSelect } from "../Components/Form";

function Takeover_drone() {
  const [ip_username, setUsername] = useState("");
  const [ip_id, setId] = useState("");
  const [ip_tag, setTag] = useState(-1);
  const [notification, setNotification] = useState("");

  const takeoverDrone = () => {

    if(ip_username.length > 0 && ip_id.length > 0 && ip_tag > -1){
        Axios.post("http://localhost:3001/takeover_drone", {
          ip_username: ip_owner,
          ip_id: ip_long_name,
          ip_tag: ip_tag
        }).then((res) => {
            setNotification(res.data.message)
        });
    } else {
      setNotification("One of your field(s) is empty");
    }

  };

  const colNames = ["Pilot Username", "Delivery Service ID", "Drone Tag"];
 
  return (
    <>
      <div className="App">
        <div className="information">
        <h1>Takeover Drone</h1>
          <h2>{notification}</h2>
          <label>{colNames[0]}:</label>
          <UsernameSelect name="username" onChange={(event) => {setUsername(event.target.value);}} />
          <label>{colNames[1]}:</label>
          <DeliveryService name="service" onChange={(event) => {setId(event.target.value); setTag(-1);}} />
          <label>{colNames[2]}:</label>
          <Drone name="drone" did={ip_id} onChange={(event) => {setTag(event.target.value);}} />
          <button onClick={takeoverDrone}>Takeover Drone</button>
        </div>
    </div>
    </>
  );  
}

export default Takeover_drone;