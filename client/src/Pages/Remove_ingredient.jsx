import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Remove_ingredient() {
    const [ip_id, setIpId] = useState("");
    const [ip_tag, setIpTag] = useState(0);
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
        if(ip_id.length > 0 && ip_tag !== 0 ) {
            Axios.post("http://localhost:3001/remove_drone" , {
                ip_id: ip_id,
                ip_tag: ip_tag,
            }).then((res) => {
                setNotification(res.data.message)
            });      
        } else {
            setNotification("One of your field(s) is empty");
        }
        
    };

 
    return (
      <>
        <div className="App">
          
          <div className="information">
          <text >  Remove Drone Procedure</text>
          <h1>{notification}</h1>
            <label>{colNames[0]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpId(event.target.value);
              }}
            />
            <label>{colNames[1]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpTag(event.target.value);
              }}
            />
            <button onClick={removeDrone}>Remove Drone</button>
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
  
export default Remove_drone;