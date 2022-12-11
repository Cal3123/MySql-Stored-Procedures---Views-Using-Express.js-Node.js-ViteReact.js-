import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Add_location() {
    const [ip_label, setIpLabel] = useState("");
    const [ip_xcoord, setIpXCoord] = useState(null);
    const [ip_ycoord, setIpYCoord] = useState(null);
    const [ip_space, setIpSpace] = useState(0);
    const [locations, setLocations] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["Label", "XCoord", "YCoord", "Space"];


    
    const addLocation = () => {
      if (ip_label.length < 1) {
        setNotification("Please Specify a Location Label");
      } else if (ip_xcoord === null) {
        setNotification("Please Specify an X Coordinate");
      } else if (ip_ycoord === null) {
        setNotification("Please Specify a Y Coordinate");
      } else if (ip_space < 1) {
        setNotification("Locations Must Have At Least 1 Drone Capacity");
      } else {
        Axios.post("http://localhost:3001/add_location", {
          ip_label : ip_label,
          ip_x_coord : ip_xcoord,
          ip_y_coord : ip_ycoord,
          ip_space : ip_space,
        }).then((res) => {
            setNotification(res.data.message)
        });
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
          <h1 >  Add Location Procedure</h1>
          <h2>{notification}</h2>
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
                setIpXCoord(parseInt(event.target.value));
              }}
            />
            <label>{colNames[2]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpYCoord(parseInt(event.target.value));
              }}
            />
            <label>{colNames[3]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpSpace(parseInt(event.target.value));
              }}
              min="0"
            />
            <button onClick={addLocation}>Add Location</button>
          </div>
          <div className="locations">
            <button onClick={getLocations}>Show/Refresh Locations</button>
              
  
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