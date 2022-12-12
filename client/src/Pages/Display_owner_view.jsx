import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Display_owner_view() {
    const [ownerView, setOwnerView] = useState([]);
    const [notification, setNotification] = useState("");
    
    const getEmployees = () => {
      Axios.get("http://localhost:3001/display_owner_view").then((response) => {
        if(response.message === "Get Error") {
          setNotification("Get Error")
        } else {
            setOwnerView(response.data);
        }     
      });
    };
 
    const colNames = ["Username", "First Name", "Last Name", "Address", "Restaurant Count", "Place Count", "Rating Highs", "Rating Lows", "Debt"];
    return (
      <>
        <div className="App">
          <h1 >  Display Owner View </h1>
          <h2>{notification}</h2>
          <div className="employees">
            <button onClick={getEmployees}>Show Owner View</button>
          </div>
      </div>
      <Table list={ownerView} colNames={colNames}/>
      </>
    );  
  }
export default Display_owner_view;