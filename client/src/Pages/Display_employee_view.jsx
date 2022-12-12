import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Display_employee_view() {
    const [employeeView, setEmployeeView] = useState([]);
    const [notification, setNotification] = useState("");
    
    const getEmployees = () => {
      Axios.get("http://localhost:3001/display_employee_view").then((response) => {
        if(response.data.message === "Get Error") {
          setNotification("Get Error")
        } else {
            setEmployeeView(response.data);
        }     
      });
    };
 
    return (
      <>
        <div className="App">
          <h1 >  Display Employee View </h1>
          <h2>{notification}</h2>
          <div className="employees">
            <button onClick={getEmployees}>Show Employees View</button>
          </div>
      </div>
      <Table list={employeeView}/>
      </>
    );  
  }
export default Display_employee_view;