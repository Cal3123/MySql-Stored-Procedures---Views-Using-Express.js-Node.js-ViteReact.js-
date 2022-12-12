import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Display_pilot_view() {
    const [pilotView, sePilotView] = useState([]);
    const [notification, setNotification] = useState("");
    
    const getEmployees = () => {
      Axios.get("http://localhost:3001/display_pilot_view").then((response) => {
        if(response.message === "Get Error") {
          setNotification("Get Error")
        } else {
            sePilotView(response.data);
        }     
      });
    };
 
    return (
      <>
        <div className="App">
          <h1 >  Display Location View </h1>
          <h2>{notification}</h2>
          <div className="employees">
            <button onClick={getEmployees}>Show Location View</button>
          </div>
      </div>
      <Table list={pilotView}/>
      </>
    );  
  }
export default Display_pilot_view;