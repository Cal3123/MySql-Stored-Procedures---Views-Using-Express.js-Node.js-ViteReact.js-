import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [ip_username, setUserName] = useState("");
  const [ip_licenseID, setLicenseID] = useState("");
  const [ip_pilot_experience, setPilotExperience] = useState(0);
  const [pilots, setPilots] = useState([]);
  const [notification, setNotification] = useState("");

  const addEmployee = () => {
    Axios.post("http://localhost:3001/add_pilot_role", {
      ip_username: ip_username,
      ip_licenseID: ip_licenseID,
      ip_pilot_experience: ip_pilot_experience,
    }).then((res) => {
        setNotification(res.data.message)
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/pilot").then((response) => {
      console.log(response.data)
      setPilots(response.data);
    });
  };

  return (
    <div className="App">
      <text >  PHASE IV MVP</text>
      <h1>{notification}</h1>
      <div className="information">
        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <label>LicenseID:</label>
        <input
          type="text"
          onChange={(event) => {
            setLicenseID(event.target.value);
          }}
        />
        <label>PilotExperience:</label>
        <input
          type="number"
          onChange={(event) => {
            setPilotExperience(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Pilot</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Pilot</button>
          
        {pilots.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Username: {val.username}</h3>
                <h3>LicenseID: {val.licenseID}</h3>
                <h3>PilotExperiencee: {val.experience}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;