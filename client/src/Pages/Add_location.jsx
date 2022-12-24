import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Add_location() {
    const [ip_label, setIpLabel] = useState("");
    const [ip_xcoord, setIpXCoord] = useState(0);
    const [ip_ycoord, setIpYCoord] = useState(0);
    const [ip_space, setIpSpace] = useState(0);
    const [locations, setLocations] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["Label", "XCoord", "YCoord", "Space"];


    
    const addLocation = () => {
      if (ip_label.length < 1) {
        setNotification("Please Enter a Location Label");
      } else if (ip_xcoord === null) {
        setNotification("Please Enter an X Coordinate");
      } else if (ip_ycoord === null) {
        setNotification("Please Enter a Y Coord");
      } else if (ip_space < 1) {
        setNotification("Locations Must Have Drone Space");
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
            if(response.data.message === "Get Error") {
                setNotification("Get Error")
            } else {
                setLocations(response.data);
            }  
        });
    };

    const TableNames = ["label", "x_coord", "y_coord", "space"]
    return (
      <>
        <div className="App">
          
          <div className="information">
          <h2 >  Add Location Procedure</h2>
          <h1>{notification}</h1>
            <label>{colNames[0]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpLabel(event.target.value);
              }} minLength="1" maxLength="40"
            />
            <label>{colNames[1]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpXCoord(parseInt(event.target.value));
              }} step="1"
            />
            <label>{colNames[2]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpYCoord(parseInt(event.target.value));
              }} step="1"
            />
            <label>{colNames[3]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpSpace(parseInt(event.target.value));
              }} step="1" min="1"
            />
            <button onClick={addLocation}>Add Location</button>
          </div>
          <div className="locations">
            <button onClick={getLocations}>Show Locations</button>
          </div>
      </div>
      <Table list={locations} colNames={TableNames}/>
      </>
    );  
  }
  
export default Add_location;