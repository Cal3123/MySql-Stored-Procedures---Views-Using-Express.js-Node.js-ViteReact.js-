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
 
    return (
      <>
        <div className="App">
          <text >  Display Owner View </text>
          <h1>{notification}</h1>
          <div className="employees">
            <button onClick={getEmployees}>Show Owner View</button>
          </div>
      </div>
      <Table list={ownerView}/>
      </>
    );  
  }
export default Display_owner_view;