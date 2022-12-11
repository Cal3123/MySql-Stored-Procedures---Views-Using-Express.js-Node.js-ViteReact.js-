import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { UsernameSelect } from "../Components/Form";

function Add_employee() {
    const [ip_username, setIpUsername] = useState("");
    const [ip_first_name, setIpTag] = useState("");
    const [ip_last_name, setIpFuel] = useState("");
    const [ip_address, setIpCapacity] = useState("");
    const [ip_birthdate, setIpBirthDate] = useState(null);
    const [ip_taxID, setIpTaxId] = useState("");
    const [ip_hired, setIpHired] = useState(null);
    const [ip_employee_experience, setEmployeeExperience] = useState(0);
    const [ip_salary, setIpSalary] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["Username", "First Name", "Last Name", "Address", "Birth Date", "Tax ID", "Hired", "Employee Experience", "Salary", "Drones"];


    
    const addEmployee = () => {
  
      if(ip_username.length > 0 && ip_first_name.length > 0 && ip_employee_experience !== 0 && ip_salary !== 0
         && ip_taxID.length > 0 && ip_last_name.length > 0 && ip_hired != null && ip_birthdate != null && ip_address.length> 0 ){
          Axios.post("http://localhost:3001/add_employee", {
            ip_username : ip_username,
            ip_first_name : ip_first_name,
            ip_last_name : ip_last_name,
            ip_address : ip_address,
            ip_birthdate : ip_birthdate,
            ip_taxID : ip_taxID,
            ip_hired: ip_hired,
            ip_employee_experience: ip_employee_experience,
            ip_salary: ip_salary,
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
          setEmployees(response.data);
        }
        
      });
    };
  

 
    return (
      <>
        <div className="App">
          <h1 >  Add Employee Procedure </h1>
          <h2>{notification}</h2>
          <div className="information">
            <label>{colNames[0]}:</label>
            <input type="text" onChange={(event) => {setIpUsername(event.target.value);}} />
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
            <label>{colNames[6]}:</label>
            <input
              type="date"
              onChange={(event) => {
                setIpHired(event.target.value);
              }}
            />
            <label>{colNames[7]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setEmployeeExperience(event.target.value);
              }} defaultValue="0"
            />
            <label>{colNames[8]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpSalary(event.target.value);
              }} placeholder="Salary"
            />
            <button onClick={addEmployee}>Add Drone</button>
          </div>
          <div className="employees">
            <button onClick={getEmployees}>Show Drones</button>
          </div>
      </div>
      <Table list={employees}/>
      </>
    );  
  }
export default Add_employee;