import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, Drone, Ingredient, UsernameSelect } from "../Components/Form";

function Manage_service() {
  const [ip_username, setUsername] = useState("");
  const [ip_id, setId] = useState("");
  const [services, setServices] = useState([]);
  const [notification, setNotification] = useState("");

  const manageService = () => {
    if (ip_username.length < 1) {
        setNotification("Please Specify a Manager");
    } else if (ip_id.length < 1) {
        setNotification("Please Specify a Delivery Service To Manage");
    } else {
        Axios.post("http://localhost:3001/manage_service", {
          ip_username: ip_username,
          ip_id: ip_id
        }).then((res) => {
            setNotification(res.data.message)
        });
    }
  };

  const getManagers = () => {
    Axios.get("http://localhost:3001/manage_service").then((response) => {
      if(response.data.message === "Get Error") {
        setNotification("Get Error")
      } else {
        setServices(response.data);
      }
      
    });
  };

  const colNames = ["New Manager", "Delivery Service"];
  const TableNames = ["Delivery Service ID", "Service Name", "Home Base", "Manager"];
  return (
    <>
      <div className="App">
        <div className="information">
        <h1>Manage Delivery Service</h1>
          <h2>{notification}</h2>
          <label>{colNames[0]}:</label>
          <UsernameSelect name="username" onChange={(event) => {setUsername(event.target.value);}} />
          <label>{colNames[1]}:</label>
          <DeliveryService name="service" onChange={(event) => {setId(event.target.value);}} />
          <button onClick={manageService}>Set New Manager</button>
          <button onClick={getManagers}>View Managers</button>
        </div>
    </div>
    <Table list={services} colNames={TableNames}/>
    </>
  );  
}

export default Manage_service;