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
 
    const colNames = ["label", "x_coord", "y_coord", "restaurant count", "delivery service count", "drone count"];
    return (
      <>
        <div className="App">
          <h1 >  Display Location View </h1>
          <h2>{notification}</h2>
          <div className="employees">
            <button onClick={getEmployees}>Show Location View</button>
          </div>
      </div>
      <Table list={locationView} colNames={colNames} />
      </>
    );  
  }
export default Display_location_view;