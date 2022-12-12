import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import axios from "axios";

function Remove_ingredient() {
    const [notification, setNotification] = useState("");
    const [ip_barcode, setIpBarcode] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const colNames = ["Barcode"];
    
  
    const getIngredients = () => {
      Axios.get("http://localhost:3001/add_ingredient").then((response) => {
        if(response.data.message === "Get Error") {
          setNotification("Get Error")
        } else {
          setIngredients(response.data);
        }
        
      });
    };
    const removeIngredient = () => {
        if(ip_barcode.length > 0) {
            axios.post("http://localhost:3001/remove_ingredient" , {
                
                ip_barcode : ip_barcode
                
            }).then((res) => {
                setNotification(res.data.message)
            });      
        } else {
            setNotification("One of your field(s) is empty");
        }
    };

 
    return (
      <>
        <div className="App">
          
          <div className="information">
          <text >  Remove Ingredient Procedure</text>
          <h1>{notification}</h1>
            <label>{colNames[0]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpBarcode(event.target.value);
              }}
            />
            <button onClick={removeIngredient}>Remove Drone</button>
          </div>
          <div className="ingredients">
            <button onClick={getIngredients}>Show Drones</button>
              
  
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
      <Table list={ingredients}/>
      </>
    );  
  }
  
export default Remove_ingredient;