import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, Drone, UsernameSelect } from "../Components/Form";

function Leave_swarm() {
  const [ip_id, setId] = useState("");
  const [ip_tag, setTag] = useState(-1);
  const [drones, setDrones] = useState([]);
  const [notification, setNotification] = useState("");

  const leaveSwarm = () => {
    if (ip_id.length < 1) {
        setNotification("Please Select a Valid Delivery Service");
    } else if (ip_tag < 0) {
        setNotification("Please Select a Valid Drone");
    } else {
        Axios.post("http://localhost:3001/leave_swarm", {
          ip_id: ip_id,
          ip_tag: ip_tag
        }).then((res) => {
            setNotification(res.data.message)
        });
    }
  };

  const getDrones = () => {
    Axios.get("http://localhost:3001/leave_swarm").then((response) => {
      if(response.message === "Get Error") {
        setNotification("Get Error")
      } else {
        setDrones(response.data);
      }
      
    });
  };


  const colNames = ["Delivery Service ID", "Drone Tag"];
 
  return (
    <>
      <div className="App">
        <div className="information">
        <h1>Leave Swarm</h1>
          <h2>{notification}</h2>
          <label>{colNames[0]}:</label>
          <DeliveryService name="service" onChange={(event) => {setId(event.target.value); setTag(-1);}} />
          <label>{colNames[1]}:</label>
          <Drone name="drone" did={ip_id} onChange={(event) => {setTag(event.target.value);}} />
          <button onClick={leaveSwarm}>Leave Swarm</button>
          <button onClick={getDrones}>Show/Refresh Drones</button>
        </div>
    </div>
    <Table list={drones} />
    </>
  );  
}

export default Leave_swarm;