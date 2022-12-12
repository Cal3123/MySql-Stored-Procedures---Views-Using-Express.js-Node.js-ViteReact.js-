import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, Drone, UsernameSelect } from "../Components/Form";

function Takeover_drone() {
  const [ip_username, setUsername] = useState("");
  const [ip_id, setId] = useState("");
  const [ip_tag, setTag] = useState(-1);
  const [drones, setDrones] = useState([]);
  const [notification, setNotification] = useState("");
  const colNames =["Username", "Id", "Tag"]

  const takeoverDrone = () => {
    if (ip_username.length < 1) {
      setNotification("Please Enter a Valid Username");
    } else if (ip_id.length < 1) {
      setNotification("Please Select a Valid Delivery Service");
    } else if (ip_tag < 0) {
      setNotification("Please Select a Valid Drone");
    } else {
      Axios.post("http://localhost:3001/takeover_drone", {
        ip_username: ip_owner,
        ip_id: ip_long_name,
        ip_tag: ip_tag
      }).then((res) => {
          setNotification(res.data.message)
      });
    }
  };

  const getDrones = () => {
    Axios.get("http://localhost:3001/takeover_drone").then((response) => {
      if(response.data.message === "Get Error") {
        setNotification("Get Error")
      } else {
        setDrones(response.data);
      }     
    });
  };
  const tableNames = ["id","tag","fuel","capacity","sales","flown_by","swarm_id","swarm_tag","hover"];
 
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
          <button onClick={ getDrones}>Show Drones</button>
        </div>
        <Table list={drones} colNames={tableNames}/>

    </div>
    </>
  );  
}

export default Takeover_drone;