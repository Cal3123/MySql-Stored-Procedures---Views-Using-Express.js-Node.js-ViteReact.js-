import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, Employee, UsernameSelect } from "../Components/Form";

function Fire_employee() {
    const [ip_username, setIpUsername] = useState("");
    const [ip_id, setIpID] = useState("");
    const [employees, setEmployees] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["Employee", "Delivery Service"];


    
    const fireEmployee = () => {
      if (ip_username.length < 1) {
        setNotification("Please Select an Employee");
      } else if (ip_id.length < 1) {
        setNotification("Please Select a Delivery Service");
      } else {
        Axios.post("http://localhost:3001/fire_employee", {
          ip_username : ip_username,
          ip_id : ip_id,
        }).then((res) => {
            setNotification(res.data.message)
        });
      }
    };
  
    const getEmployees = () => {
      Axios.get("http://localhost:3001/fire_employee").then((response) => {
        if(response.data.message === "Get Error") {
          setNotification("Get Error")
        } else {
          setEmployees(response.data);
        }
        
      });
    };
  

 
    return (
      <>
        <div className="App">
          <h1 >  Fire Employee Procedure </h1>
          <h2>{notification}</h2>
          <div className="information">
            <label>{colNames[0]}:</label>
            <Employee name="username" onChange={(event) => {setIpUsername(event.target.value);}} />
            <label>{colNames[1]}:</label>
            <DeliveryService name="service" onChange={(event) => {
                setIpID(event.target.value);
              }} />
            <button onClick={fireEmployee}>Fire Employee</button>
          </div>
          <div className="employees">
            <button onClick={getEmployees}>Show Employees</button>
            
          </div>
      </div>
      <Table list={employees}/>
      </>
    );  
  }
export default Fire_employee;