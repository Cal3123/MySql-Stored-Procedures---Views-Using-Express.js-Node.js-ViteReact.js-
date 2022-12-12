import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { Location, UsernameSelect } from "../Components/Form";

function Add_service() {
    const [ip_id, setIpId] = useState("");
    const [ip_long_name, setIpLongname] = useState("");
    const [ip_home_base, setIpHomeBase] = useState("");
    const [ip_manager, setIpManager] = useState("");
    const [services, setServices] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["Delivery Service Id", "Long Name", "Home Base", "Manager"];



    
    const addService = () => {
      if (ip_id.length < 1) {
        setNotification("Please Enter a Delivery Service ID");
      } else if (ip_long_name.length < 1) {
        setNotification("Please Enter a Valid Delivery Service Name");
      } else if (ip_home_base.length < 1) {
        setNotification("Please Enter a Valid Home Base");
      } else if (ip_manager.length < 1) {
        setNotification("Please Select a Valid Manager");
      } else {
          Axios.post("http://localhost:3001/add_service", {
            ip_id : ip_id,
            ip_long_name : ip_long_name,
            ip_home_base : ip_home_base,
            ip_manager: ip_manager
          }).then((res) => {
              setNotification(res.data.message)
          });
      }
    };
  
    const getServices = () => {
      Axios.get("http://localhost:3001/add_service").then((response) => {
        if(response.data.message === "Get Error") {
            setNotification("Get Error")
          } else {
            setServices(response.data);
          }  
      });
    };
  

 
    const TableNames = ["id", "long_name", "home_base", "manager"]
    return (
      <>
        <div className="App">
          <h1 > Add Service </h1>
          <h2>{notification}</h2>
          <div className="information">
            <label>{colNames[0]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpId(event.target.value);
              }} maxLength="40" minLength="1"
            />
            <label>{colNames[1]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpLongname(event.target.value);
              }} minLength="1" maxLength="100"
            />
            <label>{colNames[2]}:</label>
            <Location name="location"  onChange={(event) => {
                setIpHomeBase(event.target.value);
              }} />
            <label>{colNames[3]}:</label>
            <UsernameSelect name="username" onChange={(event) => {
                setIpManager(event.target.value);
              }} />
            <button onClick={addService}>Add Service</button>
          </div>
          <div className="services">
            <button onClick={getServices}>Show Services</button>
          </div>
      </div>
      <Table list={services} colNames={TableNames}/>
      </>
    );  
  }
export default Add_service;