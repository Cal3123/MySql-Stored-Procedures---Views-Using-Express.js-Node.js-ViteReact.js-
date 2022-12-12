import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, Drone } from "../Components/Form";

function Refuel_drone() {
    const [ip_id, setIpId] = useState("");
    const [ip_tag, setIpTag] = useState(-1);
    const [ip_more_fuel, setIpMoreFuel] = useState(0);
    const [drones, setDrones] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["Delivery Service", "Drone Tag", "Additional Fuel"];
  
    const getDrones = () => {
      Axios.get("http://localhost:3001/refuel_drone").then((response) => {
        if(response.message === "Get Error") {
            setNotification("Get Error")
          } else {    
            if(response.message === "Get Error") {
                setNotification("Get Error")
              } else {
                setDrones(response.data);
              }
          }
        
      });
    };
    const refuelDrone = () => {
      if (ip_id.length < 1) {
        setNotification("Please Select a Delivery Service");
      } else if (ip_tag < 0) {
        setNotification("Please Enter a Valid Drone Tag");
      } else if (ip_more_fuel < 1) {
        setNotification("Fuel is Required for Refueling");
      } else {
        Axios.post("http://localhost:3001/refuel_drone" , {
          ip_id: ip_id,
          ip_tag: ip_tag,
          ip_more_fuel: ip_more_fuel
      }).then((res) => {
          setNotification(res.data.message)
      });   
      }
    };

 
    return (
      <>
        <div className="App">
          
          <div className="information">
          <h1 >  Refuel Drone Procedure</h1>
          <h2>{notification}</h2>
            <label>{colNames[0]}:</label>
            <DeliveryService name="service" onChange={(event) => {
                setIpId(event.target.value); setIpTag(-1);
              }} />
            <label>{colNames[1]}:</label>
            <Drone did={ip_id} name="drone" onChange={(event) => {
                setIpTag(event.target.value);
              }} />
            <label>{colNames[2]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpMoreFuel(parseInt(event.target.value));
              }} min="1"
            />
            <button onClick={refuelDrone}>Refuel Drone</button>
          </div>
          <div className="drones">
            <button onClick={getDrones}>Show Drones</button>
            
          </div>
      </div>
      <Table list={drones}/>
      </>
    );  
  }
  
export default Refuel_drone;