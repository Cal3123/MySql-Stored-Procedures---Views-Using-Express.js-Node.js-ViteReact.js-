import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { Employee, UsernameSelect } from "../Components/Form";

function Add_pilot_role() {
  const [ip_username, setUserName] = useState("");
  const [ip_licenseID, setLicenseID] = useState("");
  const [ip_pilot_experience, setPilotExperience] = useState(0);
  const [pilots, setPilots] = useState([]);
  const [notification, setNotification] = useState("");
  const addPilot = () => {
    if (ip_username.length < 1) {
      setNotification("Please Select an Employee");
    } else if (ip_licenseID.length < 1) {
      setNotification("Please Enter a License ID");
    } else if (ip_pilot_experience < 0) {
      setNotification("Pilot Experience Cannot Be Negative");
    } else {
      Axios.post("http://localhost:3001/add_pilot_role", {
        ip_username: ip_username,
        ip_licenseID: ip_licenseID,
        ip_pilot_experience: ip_pilot_experience,
      }).then((res) => {
          setNotification(res.data.message)
      });
    }

  };

  const getPilots = () => {
    Axios.get("http://localhost:3001/pilot").then((response) => {

      if(response.message === "Get Error") {
        setNotification("Get Error")
      } else {
        setPilots(response.data);
      }  
    });
  };

  const colNames = ["Employee", "License ID", "Pilot Experience"];
 
  return (
    <>
      <div className="App">
        <div className="information">
        <h1 >  Pilot  Procedure</h1>
          <h2>{notification}</h2>
          <label>{colNames[0]}:</label>
          <Employee name="employee" onChange={(event) => {setUserName(event.target.value);}} />
          <label>{colNames[1]}:</label>
          <input
            type="text"
            onChange={(event) => {
              setLicenseID(event.target.value);
            }}
          />
          <label>{colNames[2]}:</label>
          <input
            type="number" min="0"
            onChange={(event) => {
              setPilotExperience(parseInt(event.target.value));
            }}
          />
          <button onClick={addPilot}>Add Pilot</button>
        </div>
        <div className="employees">
          <button onClick={getPilots}>Show Pilot</button>
        
        </div>
    </div>
    <Table list={pilots} colNames={colNames} />
    </>
  );  
}

export default Add_pilot_role;