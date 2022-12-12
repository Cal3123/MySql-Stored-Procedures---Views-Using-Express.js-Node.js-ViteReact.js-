import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, Drone } from "../Components/Form";

function Remove_drone() {
    const [ip_id, setIpId] = useState("");
    const [ip_tag, setIpTag] = useState(-1);
    const [drones, setDrones] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["ID", "Tag"];
  
    const getDrones = () => {
      Axios.get("http://localhost:3001/add_drone").then((response) => {
        if(response.message === "Get Error") {
            setNotification("Get Error")
          } else {
            setDrones(response.data);
          }
        
      });
    };
    const removeDrone = () => {
      if (ip_id.length < 1) {
        setNotification("Please Select a Valid Delivery Service");
      } else if (ip_tag < 0) {
        setNotification("Please Select a Valid Drone");
      } else {
        Axios.post("http://localhost:3001/remove_drone" , {
          ip_id: ip_id,
          ip_tag: ip_tag,
      }).then((res) => {
          setNotification(res.data.message)
      }); 
      }
    };

 
    return (
      <>
        <div className="App">
          
          <div className="information">
          <h1 >  Remove Drone Procedure</h1>
          <h2>{notification}</h2>
            <label>{colNames[0]}:</label>
            <DeliveryService name="service" onChange={(event) => {
                setIpId(event.target.value); setIpTag(-1);
              }} />
            <label>{colNames[1]}:</label>
            <Drone did={ip_id} name="drone" onChange={(event) => {
                setIpTag(parseInt(event.target.value));
              }} />
            <button onClick={removeDrone}>Remove Drone</button>
          </div>
          <div className="drones">
            <button onClick={getDrones}>Show Drones</button>
          </div>
      </div>
      <Table list={drones}/>
      </>
    );  
  }
  
export default Remove_drone;