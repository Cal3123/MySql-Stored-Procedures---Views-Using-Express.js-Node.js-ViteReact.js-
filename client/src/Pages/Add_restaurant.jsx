import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Add_restaurant() {
    const [ip_long_name, setLongName] = useState("");
    const [ip_rating, setRating] = useState(0);
    const [ip_spent, setSpent] = useState(0);
    const [ip_location, setLocation] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [notification, setNotification] = useState("");
    const colNames = ["Long Name", "Rating", "Spent", "Location"];


    
    const addRestaurant = () => {
  
      if(ip_long_name.length > 0 && ip_rating !== 0 && ip_spent !== 0 
        && ip_location.length > 0 ){
          Axios.post("http://localhost:3001/add_restaurant", {
            ip_long_name : ip_long_name,
            ip_rating : ip_rating,
            ip_spent : ip_spent,
            ip_location : ip_location,
          }).then((res) => {
              setNotification(res.data.message)
          });
      } else {
        setNotification("One of your field(s) is empty");
      }
  
    };
  
    const getRestaurants = () => {
      Axios.get("http://localhost:3001/add_restaurant").then((response) => {
        if(response.message === "Get Error") {
          setNotification("Get Error")
        } else {
          setRestaurants(response.data);
        }
        
      });
    };
 
    return (
      <>
        <div className="App">
          <text >  Add Restaurant Procedure </text>
          <h1>{notification}</h1>
          <div className="information">
            <label>{colNames[0]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setLongName(event.target.value);
              }}
            />
            <label>{colNames[1]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setRating(event.target.value);
              }}
            />
            <label>{colNames[2]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setSpent(event.target.value);
              }}
            />
            <label>{colNames[3]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
            <button onClick={addRestaurant}>Add Restaurant</button>
          </div>
          <div className="restaurants">
            <button onClick={getRestaurants}>Show Restaurants</button>
              
  
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
      <Table list={restaurants}/>
      </>
    );  
  }
export default Add_restaurant;