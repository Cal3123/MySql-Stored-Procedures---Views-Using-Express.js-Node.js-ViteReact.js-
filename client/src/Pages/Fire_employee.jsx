import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { UsernameSelect } from "../Components/Form";

function Fire_employee() {
    const [ip_username, setIpUsername] = useState("");
    const [ip_id, setIpID] = useState("");
    const [employees, setEmployees] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["Username", "ID"];


    
    const fireEmployee = () => {
  
      if(ip_username.length > 0 && ip_id.length > 0){
          Axios.post("http://localhost:3001/fire_employee", {
            ip_username : ip_username,
            ip_id : ip_id,
          }).then((res) => {
              setNotification(res.data.message)
          });
      } else {
        setNotification("One of your field(s) is empty");
      }
  
    };
  
    const getEmployees = () => {
      Axios.get("http://localhost:3001/fire_employee").then((response) => {
        if(response.message === "Get Error") {
          setNotification("Get Error")
        } else {
          setEmployees(response.data);
        }
        
      });
    };
  

 
    return (
      <>
        <div className="App">
          <text >  Fire Employee Procedure </text>
          <h1>{notification}</h1>
          <div className="information">
            <label>{colNames[0]}:</label>
            <UsernameSelect name="username" onChange={(event) => {setIpUsername(event.target.value);}} />
            <label>{colNames[1]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpID(event.target.value);
              }}
            />
            <button onClick={fireEmployee}>Add Drone</button>
          </div>
          <div className="employees">
            <button onClick={getEmployees}>Show Drones</button>
              
  
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
      <Table list={employees}/>
      </>
    );  
  }
export default Fire_employee;