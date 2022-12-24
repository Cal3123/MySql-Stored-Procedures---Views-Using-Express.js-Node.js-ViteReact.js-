import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, UsernameSelect } from "../Components/Form";

function Add_drone() {
    const [ip_id, setIpId] = useState("");
    const [ip_tag, setIpTag] = useState(-1);
    const [ip_fuel, setIpFuel] = useState(0);
    const [ip_capacity, setIpCapacity] = useState(0);
    const [ip_sales, setIpSales] = useState(0);
    const [ip_flown_by, setIpFlownBy] = useState("");
    const [drones, setDrones] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["ID", "Tag", "Fuel", "Capacity", "Sales", "Flown By"];


    
    const addDrone = () => {
      if (ip_id.length < 1) {
        setNotification("Please Select a Valid Delivery Service");
      } else if (ip_tag < 0) {
        setNotification("Please Enter a Valid Drone Tag");
      } else if (ip_capacity < 1) {
        setNotification("Drones Must Be Able to Carry Loads");
      } else if (ip_sales < 0) {
        setNotification("Drones Cannot Have Negative Sales. Review Balance Sheets.")
      }  else if (ip_fuel < 0) {
        setNotification("Drones Cannot Have Negative Fuel");
      } else if (ip_flown_by.length < 1) {
        setNotification("Drone Must Have Initial Pilot");
      } else {
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
      }
  
    };
  
    const getDrones = () => {
      Axios.get("http://localhost:3001/add_drone").then((response) => {
        if(response.data.message === "Get Error") {
          setNotification("Get Error")
        } else {
          setDrones(response.data);
        }
      });
    };
  

    const TableNames = ["id", "tag", "fuel", "capacity", "sales", "flown_by", "swarm_id", "swarm_tag", "hover"]
    return (
      <>
        <div className="App">
          
          <div className="information">
          <h1 >  Add Drone  Procedure</h1>
          <h2>{notification}</h2>
            <label>{colNames[0]}:</label>
            <DeliveryService name="service" onChange={(event) => {setIpId(event.target.value); setIpTag(-1);}} />
            <label>{colNames[1]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpTag(parseInt(event.target.value));
              }} min="0"
            />
            <label>{colNames[2]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpFuel(parseInt(event.target.value));
              }} min="0"
            />
            <label>{colNames[3]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpCapacity(parseInt(event.target.value));
              }} min="0"
            />
            <label>{colNames[4]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpSales(parseInt(event.target.value));
              }} min="0"
            />
            <label>{colNames[5]}:</label>
            <UsernameSelect name="flown_by" onChange={(event) => {setIpFlownBy(event.target.value);}} />
            <button onClick={addDrone}>Add Drone</button>
          </div>
          <div >
            <button onClick={getDrones}>Show Drones</button>
          </div>
      </div>
      <Table list={drones} colNames={TableNames}/>
      </>
    );  
  }
  
export default Add_drone;