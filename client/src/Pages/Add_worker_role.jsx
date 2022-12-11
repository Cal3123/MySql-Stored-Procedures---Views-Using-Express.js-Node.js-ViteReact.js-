import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Add_worker_role() {
    const [ip_username, setIpUsername] = useState("");
    const colNames = ["Username"];
    const [notification, setNotification] = useState("");
    const [worker_roles, setWorker_roles] = useState([]);
    
    const addWorker_role = () => {
  
      if(ip_username.length > 0){
          Axios.post("http://localhost:3001/add_worker_role", {
            ip_username : ip_username
          }).then((res) => {
              setNotification(res.data.message)
          });
      } else {
        setNotification("One of your field(s) is empty");
      }
  
    };
  
    const getWorker_roles = () => {
      Axios.get("http://localhost:3001/add_worker_role").then((response) => {
        if(response.message === "Get Error") {
            setNotification("Get Error")
          } else {
            setWorker_roles(response.data);
          }  
      });
    };
  

 
    return (
      <>
        <div className="App">
          <text > Worker Roles </text>
          <h1>{notification}</h1>
          <div className="information">
            <label>{colNames[0]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpUsername(event.target.value);
              }}
            />
            <button onClick={addWorker_role}>Add Worker Role</button>
          </div>
          <div className="worker_roles">
            <button onClick={getWorker_roles}>Show Worker Roles</button>
              
  
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
      <Table list={worker_roles}/>
      </>
    );  
  }
export default Add_worker_role;