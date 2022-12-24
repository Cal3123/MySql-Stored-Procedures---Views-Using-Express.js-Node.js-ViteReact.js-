import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Display_service_view() {
    const [serviceView, setLocationView] = useState([]);
    const [notification, setNotification] = useState("");
    
    const getEmployees = () => {
      Axios.get("http://localhost:3001/display_service_view").then((response) => {
        if(response.data.message === "Get Error") {
          setNotification("Get Error")
        } else {
            setLocationView(response.data);
        }     
      });
    };
 
    const TableNames = ["Service ID", "Name", "Home Base", "Manager", "Revenue", "Ingredients Carried", "Cost Carried", "Weight Carried"];
    return (
      <>
        <div className="App">
          <h1 >  Display Service View </h1>
          <h2>{notification}</h2>
          <div className="employees">
            <button onClick={getEmployees}>Show Service View</button>
          </div>
      </div>
      <Table list={serviceView} colNames={TableNames} />
      </>
    );  
  }
export default Display_service_view;