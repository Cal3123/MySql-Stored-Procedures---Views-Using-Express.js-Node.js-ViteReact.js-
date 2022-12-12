import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, UsernameSelect } from "../Components/Form";

function Add_drone() {
    const [ip_id, setIpId] = useState("");
    const [ip_tag, setIpTag] = useState(0);
    const [ip_fuel, setIpFuel] = useState(0);
    const [ip_capacity, setIpCapacity] = useState(0);
    const [ip_sales, setIpSales] = useState(0);
    const [ip_flown_by, setIpFlownBy] = useState("");
    const [drones, setDrones] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["ID", "Tag", "Fuel", "Capacity", "Sales", "Flown By"];


    
    const addDrone = () => {
  
      if(ip_id.length > 0 && ip_tag !== 0 && ip_capacity !== 0 && ip_sales !== 0
         && ip_flown_by.length > 0 && ip_fuel !== 0){
          Axios.post("http://localhost:3001/add_drone", {
            ip_id : ip_id,
            ip_tag : ip_tag,
            ip_fuel : ip_fuel,
            ip_capacity : ip_capacity,
            ip_sales : ip_sales,
            ip_flown_by : ip_flown_by,
          }).then((res) => {
              setNotification(res.data.message)
          });
      } else {
        setNotification("One of your field(s) is empty");
      }
  
    };
  
    const getDrones = () => {
      Axios.get("http://localhost:3001/add_drone").then((response) => {
        console.log(response)
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
          
          <div className="information">
          <text >  Add Drone  Procedure</text>
          <h1>{notification}</h1>
            <label>{colNames[0]}:</label>
            <DeliveryService name="service" onChange={(event) => {setIpId(event.target.value);}} />
            <label>{colNames[1]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpTag(event.target.value);
              }}
            />
            <label>{colNames[2]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpFuel(event.target.value);
              }}
            />
            <label>{colNames[3]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpCapacity(event.target.value);
              }}
            />
            <label>{colNames[4]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpSales(event.target.value);
              }}
            />
            <label>{colNames[5]}:</label>
            <UsernameSelect name="flown_by" onChange={(event) => {setIpFlownBy(event.target.value);}} />
            <button onClick={addDrone}>Add Drone</button>
            <button onClick={getDrones}>Show Drones</button>
          </div>
      </div>
      <Table list={drones}/>
      </>
    );  
  }
  
export default Add_drone;