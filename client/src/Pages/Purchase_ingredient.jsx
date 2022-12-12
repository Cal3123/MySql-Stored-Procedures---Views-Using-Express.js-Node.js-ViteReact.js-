import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Purchase_ingredient() {
    
    const [ip_long_name, setIpLongName] = useState("");
    const [ip_id, setIpId] = useState("");
    const [ip_tag, setIpTag] = useState(0);
    
    const [ip_barcode, setIpBarcode] = useState("");
    const [ip_quantity, setIpQuantity] = useState("");
    const [notification, setNotification] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const colNames = ["ID", "Tag", "More Fuel"];
  
    const getIngredients = () => {
      Axios.get("http://localhost:3001/purchase_ingredient").then((response) => {
        if(response.message === "Get Error") {
            setNotification("Get Error")
          } else {
            setIngredients(response.data);
          }
        
      });
    };
    const purchase_ingredient = () => {
        if(ip_long_name.length > 0 && ip_id.length > 0 && ip_tag !== 0 && ip_barcode.length > 0 && ip_quantity !==0) {
            Axios.post("http://localhost:3001/purchase_ingredient" , {
                ip_long_name : ip_long_name,
                ip_id: ip_id,
                ip_tag: ip_tag,
                ip_barcode: ip_barcode,
                ip_quantity : ip_quantity
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
          <text >  Purchase Ingredient Procedure</text>
          <h1>{notification}</h1>
            <label>{colNames[0]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpLongName(event.target.value);
              }}
            />
            <label>{colNames[1]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpId(event.target.value);
              }}
            />
            <label>{colNames[2]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpTag(event.target.value);
              }}
            />
            <label>{colNames[3]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpBarcode(event.target.value);
              }}
            />
            <label>{colNames[4]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpQuantity(event.target.value);
              }}
            />
            <button onClick={purchase_ingredient}>Purchase Ingredient</button>
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
  
export default Purchase_ingredient;