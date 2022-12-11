import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Display_location_view() {
    const [locationView, setLocationView] = useState([]);
    const [notification, setNotification] = useState("");
    
    const getEmployees = () => {
      Axios.get("http://localhost:3001/display_location_view").then((response) => {
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
          <text >  Display Location View </text>
          <h1>{notification}</h1>
          <div className="employees">
            <button onClick={getEmployees}>Show Location View</button>
          </div>
      </div>
      <Table list={locationView}/>
      </>
    );  
  }
export default Display_location_view;