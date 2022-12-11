import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Add_owner() {
    const [ip_username, setIpUsername] = useState("");
    const [ip_first_name, setIpTag] = useState("");
    const [ip_last_name, setIpFuel] = useState("");
    const [ip_address, setIpCapacity] = useState("");
    const [ip_birthdate, setIpBirthDate] = useState(null);
    const [owners, setOwners] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["Username", "First Name", "Last Name", "Address", "Birth Date"];
    
    const addOwner = () => {
  
      if(ip_username.length > 0 && ip_first_name.length && ip_last_name.length > 0 
        && ip_birthdate != null && ip_address.length> 0 ){
          Axios.post("http://localhost:3001/add_owner", {
            ip_username : ip_username,
            ip_first_name : ip_first_name,
            ip_last_name : ip_last_name,
            ip_address : ip_address,
            ip_birthdate : ip_birthdate,
          }).then((res) => {
              setNotification(res.data.message)
          });
      } else {
        setNotification("One of your field(s) is empty");
      }
  
    };
  
    const getOwners = () => {
      Axios.get("http://localhost:3001/add_owner").then((response) => {
        if(response.message === "Get Error") {
          setNotification("Get Error")
        } else {
          setOwners(response.data);
        }
        
      });
    };
  

 
    return (
      <>
        <div className="App">
          <text >  Add Owner Procedure </text>
          <h1>{notification}</h1>
          <div className="information">
            <label>{colNames[0]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpUsername(event.target.value);
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
                setIpFuel(event.target.value);
              }}
            />
            <label>{colNames[3]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpCapacity(event.target.value);
              }}
            />
            <label>{colNames[4]}:</label>
            <input
              type="date"
              onChange={(event) => {
                setIpBirthDate(event.target.value);
              }}
            />
            <button onClick={addOwner}>Add Drone</button>
          </div>
          <div className="owners">
            <button onClick={getOwners}>Show Drones</button>
              
  
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
      <Table list={owners}/>
      </>
    );  
  }
export default Add_owner;