import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import axios from "axios";
import { Pilot } from "../Components/Form";

function Remove_pilot_role() {
    const [ip_username, setUserName] = useState("");
    const [pilots, setPilots] = useState([]);
    const [notification, setNotification] = useState("");
    const  colNames = ["username"];
    const  TableNames = ["Employee", "License ID", "Pilot Experience"];

    
  
    const getPilot_roles = () => {
      Axios.get("http://localhost:3001/remove_pilot_role").then((response) => {
        if(response.data.message === "Get Error") {
          setNotification("Get Error")
        } else {
          setPilots(response.data);
        }
        
      });
    };
    const removePilot_role = () => {
        if(ip_username.length > 0) {
            axios.post("http://localhost:3001/remove_pilot_role" , {
                
                ip_username : ip_username
                
            }).then((res) => {
                setNotification(res.data.message)
            });      
        } else {
            setNotification("Please Select a Valid Pilot");
        }
    };

 
    return (
      <>
        <div className="App">
          
          <div className="information">
          <h1 >  Remove Pilot Role Procedure</h1>
          <h2>{notification}</h2>
            <label>{colNames[0]}:</label>
            <Pilot name="pilot" onChange={(event) => {
                setUserName(event.target.value);
              }} />
            <button onClick={removePilot_role}>Remove Pilot Role</button>
          </div>
          <div className="pilot_roles">
            <button onClick={getPilot_roles}>Show Pilot Roles</button>
          </div>
      </div>
      <Table list={pilots} colNames={TableNames}/>
      </>
    );  
  }
  
export default Remove_pilot_role;