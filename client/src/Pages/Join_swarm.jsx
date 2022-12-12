import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Join_swarm() {
    const [ip_id, setId] = useState("");
    const [ip_tag, setIpTag] = useState(0);
    const [ip_swarm_leader_tag, setSwarmLeaderTag] = useState(0);
    const [drones, setDrones] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["ID", "Tag", "Swarm Leader Tag"];


    
    const joinSwarm = () => {
  
      if(ip_id.length > 0 && ip_tag !== 0 && ip_swarm_leader_tag !== 0 ){
          Axios.post("http://localhost:3001/join_swarm", {
            ip_id : ip_id,
            ip_tag : ip_tag,
            ip_swarm_leader_tag : ip_swarm_leader_tag,
          }).then((res) => {
              setNotification(res.data.message)
          });
      } else {
        setNotification("One of your field(s) is empty");
      }
  
    };
  
    const getDrones = () => {
      Axios.get("http://localhost:3001/join_swarm").then((response) => {
        if(response.data.message === "Get Error") {
          setNotification("Get Error")
        } else {
          setDrones(response.data);
        }
        
      });
    };
  

 
    return (
      <>
        <div className="App">
          <text >  Join Swarm Procedure </text>
          <h1>{notification}</h1>
          <div className="information">
            <label>{colNames[0]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>{colNames[1]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpTag(event.target.value);
              }}
            />
            <label>{colNames[2]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setSwarmLeaderTag(event.target.value);
              }}
            />
            <button onClick={joinSwarm}>Join Swarm</button>
          </div>
          <div className="drones">
            <button onClick={getDrones}>Show Drones</button>
              
  
            {/*pilots.map((val, key) => {
              return (
                <div className="employee">
                  <div>
                    <h3>Username: {val.username}</h3>
                    <h3>LicenseID: {val.licenseID}</h3>
                    <h3>PilotExperiencee: {val.experience}</h3>
                  </div>
                </div>
              );
            })*/}
          </div>
      </div>
      <Table list={drones}/>
      </>
    );  
  }
export default Join_swarm;