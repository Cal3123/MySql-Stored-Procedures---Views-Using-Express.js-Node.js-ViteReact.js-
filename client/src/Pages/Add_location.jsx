import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Add_location() {
    const [ip_label, setIpLabel] = useState("");
    const [ip_xcoord, setIpXCoord] = useState(0);
    const [ip_ycoord, setIpYCoord] = useState(0);
    const [ip_space, setIpSpace] = useState(0);
    const [notification, setNotification] = useState("");
    const colNames = ["Label", "XCoord", "YCoord", "Space"];


    
    const addLocation = () => {
  
      if(ip_label.length > 0 && ip_xcoord !== null && ip_ycoord !== null && ip_space !== 0){
          Axios.post("http://localhost:3001/add_location", {
            ip_label : ip_label,
            ip_xcoord : ip_xcoord,
            ip_ycoord : ip_ycoord,
            ip_space : ip_space,
          }).then((res) => {
              setNotification(res.data.message)
          });
      } else {
        setNotification("One of your field(s) is empty");
      }
  
    };
  
    const getLocations = () => {
        Axios.get("http://localhost:3001/add_location").then((response) => {
            if(response.message === "Get Error") {
                setNotification("Get Error")
            } else {
                setLocations(response.data);
            }  
        });
    };

 
    return (
      <>
        <div className="App">
          
          <div className="information">
          <text >  Add Location Procedure</text>
          <h1>{notification}</h1>
            <label>{colNames[0]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpLabel(event.target.value);
              }}
            />
            <label>{colNames[1]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpXCoord(event.target.value);
              }}
            />
            <label>{colNames[2]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpYCoord(event.target.value);
              }}
            />
            <label>{colNames[3]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpSpace(event.target.value);
              }}
            />
            <button onClick={addLocation}>Add Location</button>
          </div>
          <div className="locations">
            <button onClick={getLocations}>Show Locations</button>
              
  
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
      <Table list={locations}/>
      </>
    );  
  }
  
export default Add_location;