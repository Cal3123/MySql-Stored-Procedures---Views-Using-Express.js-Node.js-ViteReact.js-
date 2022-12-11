import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, Drone } from "../Components/Form";

function Join_swarm() {
    const [ip_id, setId] = useState("");
    const [ip_tag, setIpTag] = useState(0);
    const [ip_swarm_leader_tag, setSwarmLeaderTag] = useState(0);
    const [drones, setDrones] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["ID", "Tag", "Swarm Leader Tag"];


    
    const joinSwarm = () => {
      if(ip_id.length > 0 && ip_tag !== 0 && ip_swarm_leader_tag !== 0 ) {
          if (ip_tag == ip_swarm_leader_tag) {
            setNotification("Cannot Follow Self");
          } else {
            Axios.post("http://localhost:3001/join_swarm", {
              ip_id : ip_id,
              ip_tag : ip_tag,
              ip_swarm_leader_tag : ip_swarm_leader_tag,
            }).then((res) => {
                setNotification(res.data.message)
            });
          }
      } else {
        setNotification("One of your field(s) is empty");
      }
  
    };
  
    const getDrones = () => {
      Axios.get("http://localhost:3001/join_swarm").then((response) => {
        if(response.message === "Get Error") {
          setNotification("Get Error")
        } else {
          setDrones(response.data);
        }
        
      });
    };
  

 
    return (
      <>
        <div className="App">
          <h1>  Join Swarm Procedure </h1>
          <h2>{notification}</h2>
          <div className="information">
            <label>{colNames[0]}:</label>
            <DeliveryService name="service" onChange={(event) => {setId(event.target.value); setSwarmLeaderTag(-1); setIpTag(-1);}} />
            <label>{colNames[1]}:</label>
            <Drone name="follower_drone" did={ip_id} onChange={(event) => {setIpTag(event.target.value);}} />
            <label>{colNames[2]}:</label>
            <Drone name="leader_drone" did={ip_id} onChange={(event) => {setSwarmLeaderTag(event.target.value);}} />
            <button onClick={joinSwarm}>Join Swarm</button>
          </div>
          <div className="drones">
            <button onClick={getDrones}>Show Drones</button>
          </div>
      </div>
      <Table list={drones}/>
      </>
    );  
  }
export default Join_swarm;