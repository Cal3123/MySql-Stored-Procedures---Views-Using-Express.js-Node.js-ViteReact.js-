import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, Drone, Location, UsernameSelect } from "../Components/Form";

function Fly_drone() {
    const [ip_id, setId] = useState("");
    const [ip_tag, setIpTag] = useState(-1);
    const [ip_destination, setIpDestination] = useState("");
    const [drones, setDrones] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["Delivery Service", "Drone Tag", "Destination"];


    
    const addEmployee = () => {
      if (ip_id.length < 1) {
        setNotification("Please Select a Delivery Service");
      } else if (ip_tag < 0) {
        setNotification("Please Select a Drone");
      } else if (ip_destination.length < 1) {
        setNotification("Please Select a Destination");
      } else {
        Axios.post("http://localhost:3001/fly_drone", {
          ip_id : ip_id,
          ip_tag : ip_tag,
          ip_destination : ip_destination
        }).then((res) => {
            setNotification(res.data.message)
        });
      }
    };
  
    const getDrones = () => {
      Axios.get("http://localhost:3001/fly_drone").then((response) => {
        if(response.data.message === "Get Error") {
          setNotification("Get Error")
        } else {
          setDrones(response.data);
        }
        
      });
    };
  

 
    const TableNames = ["id", "tag", "fuel", "capacity", "sales", "flown_by", "swarm_id","swarm_tag", "hover"]
    return (
      <>
        <div className="App">
          <h1 >  Fly Drone </h1>
          <h2>{notification}</h2>
          <div className="information">
            <label>{colNames[0]}:</label>
            <DeliveryService name="service" onChange={(event) => {setId(event.target.value);}} />
            <label>{colNames[1]}:</label>
            <Drone did={ip_id} name="drone" onChange={(event) => {
                setIpTag(event.target.value);
              }} />
            <label>{colNames[2]}:</label>
            <Location name="location" onChange={(event) => {
                setIpDestination(event.target.value);
              }} />
            <button onClick={addEmployee}>Add Drone</button>
          </div>
          <div className="drones">
            <button onClick={getDrones}>Show Drones</button>
          </div>
      </div>
      <Table list={drones} colNames={TableNames}/>
      </>
    );  
}
export default Fly_drone;