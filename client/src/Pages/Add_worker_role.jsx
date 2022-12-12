import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { Employee } from "../Components/Form";

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
        setNotification("Please Select a Worker");
      }
  
    };
  
    const getWorker_roles = () => {
      Axios.get("http://localhost:3001/add_worker_role").then((response) => {
        if(response.data.message === "Get Error") {
            setNotification("Get Error")
          } else {
            setWorker_roles(response.data);
          }  
      });
    };
  

 
    const TableNames = ["username"]
    return (
      <>
        <div className="App">
          <h1 > Worker Roles </h1>
          <h2>{notification}</h2>
          <div className="information">
            <label>{colNames[0]}:</label>
            <Employee name="employee" onChange={(event) => {
                setIpUsername(event.target.value);
              }} />
            <button onClick={addWorker_role}>Add Worker Role</button>
          </div>
          <div className="worker_roles">
            <button onClick={getWorker_roles}>Show Worker Roles</button>
          </div>
      </div>
      <Table list={worker_roles} colNames={TableNames}/>
      </>
    );  
  }
export default Add_worker_role;