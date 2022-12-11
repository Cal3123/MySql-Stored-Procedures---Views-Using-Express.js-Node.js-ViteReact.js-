import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Display_service_view() {
    const [serviceView, setLocationView] = useState([]);
    const [notification, setNotification] = useState("");
    
    const getEmployees = () => {
      Axios.get("http://localhost:3001/display_service_view").then((response) => {
        if(response.message === "Get Error") {
          setNotification("Get Error")
        } else {
            setLocationView(response.data);
        }     
      });
    };
 
    return (
      <>
        <div className="App">
          <text >  Display Service View </text>
          <h1>{notification}</h1>
          <div className="employees">
            <button onClick={getEmployees}>Show Service View</button>
          </div>
      </div>
      <Table list={serviceView}/>
      </>
    );  
  }
export default Display_service_view;