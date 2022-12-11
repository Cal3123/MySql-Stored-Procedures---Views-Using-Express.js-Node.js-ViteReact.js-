import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Add_ingredient() {
    const [ip_barcode, setIpBarcode] = useState("");
    const [ip_iname, setIpIname] = useState("");
    const [ip_weight, setIpWeight] = useState(0);
    const [notification, setNotification] = useState("");
    const colNames = ["Barcode", "Iname", "Weight"];



    
    const addIngredient = () => {
  
      if(ip_barcode.length > 0 && ip_iname !== 0 && ip_weight !== 0){
          Axios.post("http://localhost:3001/add_ingredient", {
            ip_barcode : ip_barcode,
            ip_iname : ip_iname,
            ip_weight : ip_weight,
          }).then((res) => {
              setNotification(res.data.message)
          });
      } else {
        setNotification("One of your field(s) is empty");
      }
  
    };
  
    const getIngredients = () => {
      Axios.get("http://localhost:3001/add_ingredient").then((response) => {
        if(response.message === "Get Error") {
            setNotification("Get Error")
          } else {
            setIngredients(response.data);
          }  
      });
    };
  

 
    return (
      <>
        <div className="App">
          <text > Ingredients </text>
          <h1>{notification}</h1>
          <div className="information">
            <label>{colNames[0]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpBarcode(event.target.value);
              }}
            />
            <label>{colNames[1]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpIname(event.target.value);
              }}
            />
            <label>{colNames[2]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpWeight(event.target.value);
              }}
            />
            <button onClick={addIngredient}>Add Ingredient</button>
          </div>
          <div className="ingredients">
            <button onClick={getIngredients}>Show Ingredients</button>
              
  
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
export default Add_ingredient;