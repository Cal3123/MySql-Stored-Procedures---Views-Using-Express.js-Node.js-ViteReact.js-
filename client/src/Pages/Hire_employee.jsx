import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, UsernameSelect } from "../Components/Form"

function Hire_employee() {
    const [ip_owner, setOwner] = useState("");
    const [ip_id, setId] = useState("");
    const [employees, setEmployees] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["Owner", "ID"];


    
    const hireEmployee = () => {
  
      if(ip_owner.length > 0 && ip_id.length > 0 ){
          Axios.post("http://localhost:3001/hire_employee", {
            ip_owner : ip_owner,
            ip_id : ip_id,
          }).then((res) => {
              setNotification(res.data.message)
          });
      } else {
        setNotification("One of your field(s) is empty");
      }
  
    };
  
    const getEmployees = () => {
      Axios.get("http://localhost:3001/hire_employee").then((response) => {
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
          <h1>Add Employee Procedure </h1>
          <h2>{notification}</h2>
          <div className="information">
            <label>{colNames[0]}:</label>
            <UsernameSelect name="username" onChange={(event) => {setOwner(event.target.value);}} />
            <label>{colNames[1]}:</label>
            <DeliveryService name="service" onChange={(event) => {setId(event.target.value);}} />
            <button onClick={hireEmployee}>Hire Employee</button>
          </div>
          <div className="employees">
            <button onClick={getEmployees}>Show Employees</button>
          </div>
      </div>
      <Table list={employees} />
      </>
    );  
  }
export default Hire_employee;