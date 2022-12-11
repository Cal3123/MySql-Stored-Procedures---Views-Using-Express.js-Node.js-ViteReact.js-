import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { UsernameSelect } from "../Components/Form";

function Add_pilot_role() {
  const [ip_username, setUserName] = useState("");
  const [ip_licenseID, setLicenseID] = useState("");
  const [ip_pilot_experience, setPilotExperience] = useState(0);
  const [pilots, setPilots] = useState([]);
  const [notification, setNotification] = useState("");

  const addPilot = () => {

    if(ip_username.length > 0 && ip_licenseID.length > 0 && ip_pilot_experience.length > 0 
      && ip_pilot_experience !== 0){
        Axios.post("http://localhost:3001/add_pilot_role", {
          ip_username: ip_username,
          ip_licenseID: ip_licenseID,
          ip_pilot_experience: ip_pilot_experience,
        }).then((res) => {
            setNotification(res.data.message)
        });
    } else {
      setNotification("One of your field(s) is empty");
    }

  };

  const getPilots = () => {
    Axios.get("http://localhost:3001/pilot").then((response) => {
      console.log(response)
      setPilots(response.data);
    });
  };

  const colNames = ["Username", "LicenseID", "PilotExperience"];
 
  return (
    <>
      <div className="App">
        <div className="information">
        <text >  Pilot  Procedure</text>
          <h1>{notification}</h1>
          <label>{colNames[0]}:</label>
          <UsernameSelect name="username" onChange={(event) => {setUserName(event.target.value);}} />
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
              setPilotExperience(event.target.value);
            }}
          />
          <button onClick={addPilot}>Add Pilot</button>
        </div>
        <div className="employees">
          <button onClick={getPilots}>Show Pilot</button>
            

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
    <Table list={pilots}/>
    </>
  );  
}

export default Add_pilot_role;