import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { UsernameSelect } from "../Components/Form";

function Fly_drone() {
    const [ip_id, setIpUsername] = useState("");
    const [ip_tag, setIpTag] = useState(0);
    const [ip_destination, setIpFuel] = useState("");
    const [drones, setDrones] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["ID", "Tag", "Destination"];


    
    const addEmployee = () => {
  
      if(ip_id.length > 0 && ip_tag !== 0 && ip_destination.length > 0){
          Axios.post("http://localhost:3001/add_employee", {
            ip_id : ip_id,
            ip_tag : ip_tag,
            ip_destination : ip_destination
          }).then((res) => {
              setNotification(res.data.message)
          });
      } else {
        setNotification("One of your field(s) is empty");
      }
    };
  
    const getEmployees = () => {
      Axios.get("http://localhost:3001/add_employee").then((response) => {
        if(response.message === "Get Error") {
          setNotification("Get Error")
        } else {
          setDrones(response.data);
        }
        
      });
    };
  

 
    return (
      <>
        <div className="App">
          <text >  Add Employee Procedure </text>
          <h1>{notification}</h1>
          <div className="information">
            <label>{colNames[0]}:</label>
            <UsernameSelect name="username" onChange={(event) => {setIpUsername(event.target.value);}} />
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
            <label>{colNames[5]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpTaxId(event.target.value);
              }}
            />
                        <input
              type="date"
              onChange={(event) => {
                setIpHired(event.target.value);
              }}
            />
            <label>{colNames[6]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setEmployeeExperience(event.target.value);
              }}
            />
            <label>{colNames[7]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpSalary(event.target.value);
              }}
            />
            <button onClick={addEmployee}>Add Drone</button>
          </div>
          <div className="drones">
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
      <Table list={drones}/>
      </>
    );  
}
export default Fly_drone;