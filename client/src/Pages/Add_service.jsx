import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Add_service() {
    const [ip_id, setIpId] = useState("");
    const [ip_long_name, setIpLongname] = useState("");
    const [ip_home_base, setIpHomeBase] = useState("");
    const [ip_manager, setIpManager] = useState("");
    const [notification, setNotification] = useState("");
    const colNames = ["Id", "Long Name", "Home Base", "Manager"];



    
    const addService = () => {
  
      if(ip_id.length > 0 && ip_long_name.length > 0 && ip_home_base.length > 0 && ip_manager.length > 0){
          Axios.post("http://localhost:3001/add_service", {
            ip_id : ip_id,
            ip_long_name : ip_long_name,
            ip_home_base : ip_home_base,
            ip_manager: ip_manager
          }).then((res) => {
              setNotification(res.data.message)
          });
      } else {
        setNotification("One of your field(s) is empty");
      }
  
    };
  
    const getServices = () => {
      Axios.get("http://localhost:3001/add_service").then((response) => {
        if(response.message === "Get Error") {
            setNotification("Get Error")
          } else {
            setServices(response.data);
          }  
      });
    };
  

 
    return (
      <>
        <div className="App">
          <text > Services </text>
          <h1>{notification}</h1>
          <div className="information">
            <label>{colNames[0]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpId(event.target.value);
              }}
            />
            <label>{colNames[1]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpLongname(event.target.value);
              }}
            />
            <label>{colNames[2]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpHomeBase(event.target.value);
              }}
            />
            <label>{colNames[3]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpManager(event.target.value);
              }}
            />
            <button onClick={addService}>Add Service</button>
          </div>
          <div className="services">
            <button onClick={getServices}>Show Services</button>
              
  
            {/*pilots.map((val, key) => {
              return (
                <div className="employee">
                  <div>
                    <h3>Username: {val.username}</h3>
                    <h3>LicenseID: {val.licenseID}</h3>
                    <h3>PilotExperiencee: {val.experience}</h3>
                  </div>
                </div>
              );
            })*/}
          </div>
      </div>
      <Table list={services}/>
      </>
    );  
  }
export default Add_service;