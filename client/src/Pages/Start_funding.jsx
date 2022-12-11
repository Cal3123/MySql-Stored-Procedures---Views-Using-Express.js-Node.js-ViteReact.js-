import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { RestaurantSelect, UsernameSelect } from "../Components/Form";

function Start_funding() {
  const [ip_owner, setOwner] = useState("");
  const [ip_long_name, setRestaurantName] = useState("");
  const [notification, setNotification] = useState("");

  const startFunding = () => {

    if(ip_owner.length > 0 && ip_long_name.length > 0){
        Axios.post("http://localhost:3001/start_funding", {
          ip_owner: ip_owner,
          ip_long_name: ip_long_name
        }).then((res) => {
            setNotification(res.data.message)
        });
    } else {
      setNotification("One of your field(s) is empty");
    }

  };

  const colNames = ["Owner Username", "Restaurant Name"];
 
  return (
    <>
      <div className="App">
        <div className="information">
        <h1>Set Funder</h1>
          <h2>{notification}</h2>
          <label>{colNames[0]}:</label>
          <UsernameSelect name="username" onChange={(event) => {setOwner(event.target.value);}} />
          <label>{colNames[1]}:</label>
          <RestaurantSelect name="restaurant" onChange={(event) => {setRestaurantName(event.target.value);}} />
          <button onClick={startFunding}>Start Funding</button>
        </div>
    </div>
    </>
  );  
}

export default Start_funding;