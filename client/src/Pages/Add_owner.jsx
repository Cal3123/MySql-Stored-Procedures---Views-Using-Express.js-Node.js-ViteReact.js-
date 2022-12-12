import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { UsernameSelect } from "../Components/Form";

function Add_owner() {
    const [ip_username, setIpUsername] = useState("");
    const [ip_first_name, setIpTag] = useState("");
    const [ip_last_name, setIpFuel] = useState("");
    const [ip_address, setIpCapacity] = useState("");
    const [ip_birthdate, setIpBirthDate] = useState(null);
    const [owners, setOwners] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["Owner", "First Name", "Last Name", "Address", "Birth Date"];
    
    const addOwner = () => {
      if (ip_username.length < 1) {
        setNotification("Please Select a Owner");
      } else if (ip_first_name.length < 1) {
        setNotification("Please Specify a First Name");
      } else if (ip_last_name.length < 1) {
        setNotification("Please Specify a Last Name");
      } else if (ip_birthdate == null) {
        setNotification("Please Enter a Valid Birth Date");
      } else if (ip_address.length < 1) {
        setNotification("Please Enter a Valid Address");
      } else {
        Axios.post("http://localhost:3001/add_owner", {
          ip_username : ip_username,
          ip_first_name : ip_first_name,
          ip_last_name : ip_last_name,
          ip_address : ip_address,
          ip_birthdate : ip_birthdate
        }).then((res) => {
            setNotification(res.data.message);
        });
      }
  
    };
  
    const getOwners = () => {
      Axios.get("http://localhost:3001/add_owner").then((response) => {
        if(response.data.message === "Get Error") {
          setNotification("Get Error")
        } else {
          if(response.data.message === "Get Error") {
            setNotification("Get Error")
          } else {
            setOwners(response.data);
          } 
        }
        
      });
    };
  

    const TableNames = ["username", "first_name", "last_name", "address", "num_restaurants", "num_places", "highs", "lows", "debt"]
    return (
      <>
        <div className="App">
          <h1 >  Add Owner Procedure </h1>
          <h2>{notification}</h2>
          <div className="information">
            <label>{colNames[0]}:</label>
            <input type="text" minLength="1" maxLength="40" onChange={(event) => {setIpUsername(event.target.value);}} />
            <label>{colNames[1]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpTag(event.target.value);
              }} minLength="1" maxLength="100"
            />
            <label>{colNames[2]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpFuel(event.target.value);
              }} minLength="1" maxLength="100"
            />
            <label>{colNames[3]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpCapacity(event.target.value);
              }} minLength="1" maxLength="500"
            />
            <label>{colNames[4]}:</label>
            <input
              type="date"
              onChange={(event) => {
                setIpBirthDate(event.target.value);
              }}
            />
            <button onClick={addOwner}>Add Owner</button>
          </div>
          <div className="owners">
            <button onClick={getOwners}>Show/Refresh Owners</button>
          </div>
      </div>
      <Table list={owners} colNames={TableNames}/>
      </>
    );  
  }
export default Add_owner;