import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, UsernameSelect } from "../Components/Form"

function Hire_employee() {
    const [ip_username, setOwner] = useState("");
    const [ip_id, setId] = useState("");
    const [employees, setEmployees] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["Username", "Delivery Service"];


    
    const hireEmployee = () => {
      if (ip_username.length < 1) {
        setNotification("Please Choose a Valid User");
      } else if (ip_id.length < 1) {
        setNotification("Please Choose a Valid Delivery Service");
      } else {
          Axios.post("http://localhost:3001/hire_employee", {
            ip_owner : ip_username,
            ip_id : ip_id,
          }).then((res) => {
              setNotification(res.data.message)
          });
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