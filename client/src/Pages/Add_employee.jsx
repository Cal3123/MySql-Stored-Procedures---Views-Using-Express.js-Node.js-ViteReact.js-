import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { UsernameSelect } from "../Components/Form";

function Add_employee() {
    const [ip_username, setIpUsername] = useState("");
    const [ip_first_name, setIpFirstName] = useState("");
    const [ip_last_name, setIpLastName] = useState("");
    const [ip_address, setIpAddress] = useState("");
    const [ip_birthdate, setIpBirthDate] = useState(null);
    const [ip_taxID, setIpTaxId] = useState("");
    const [ip_hired, setIpHired] = useState(null);
    const [ip_employee_experience, setEmployeeExperience] = useState(0);
    const [ip_salary, setIpSalary] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["Username", "First Name", "Last Name", "Address", "Birth Date", "Tax ID", "Hired", "Employee Experience", "Salary", "Drones"];


    
    const addEmployee = () => {
      if (ip_username.length < 1) {
        setNotification("Please Enter a Valid Username");
      } else if (ip_first_name.length < 1) {
        setNotification("Please Enter a Valid First Name. Employees Without a Name Should See HR");
      } else if (ip_last_name.length < 1) {
        setNotification("Please Enter a Valid Last Name. Employees Without a Last Name Cannot Be Employed");
      } else if (ip_employee_experience < 0) {
        setNotification("Employees Cannot Have Negative Experience");
      } else if (ip_salary < 0) {
        setNotification("Employees Cannot Pay To Work");
      } else if (ip_taxID.length < 1) {
        setNotification("Invalid Tax ID. Tax Evasion Not Permitted.");
      } else if (ip_address.length < 1) {
        setNotification("Please Entera  Valid Address");
      } else if (ip_birthdate == null) {
        setNotification("Please Enter a Valid Birth Date. Aliens NOT Permitted.");
      } else if (ip_hired === null) {
        setNotification("Please Enter a Valid Hire Date");
      } else {
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
                setIpFirstName(event.target.value);
              }}
            />
            <label>{colNames[2]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpLastName(event.target.value);
              }}
            />
            <label>{colNames[3]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpAddress(event.target.value);
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
                setEmployeeExperience(parseInt(event.target.value));
              }} defaultValue="0"
            />
            <label>{colNames[8]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpSalary(parseInt(event.target.value));
              }} placeholder="Salary"
            />
            <button onClick={addEmployee}>Add Employee</button>
          </div>
          <div className="employees">
            <button onClick={getEmployees}>Show/Refresh Employees</button>
          </div>
      </div>
      <Table list={employees}/>
      </>
    );  
  }
export default Add_employee;