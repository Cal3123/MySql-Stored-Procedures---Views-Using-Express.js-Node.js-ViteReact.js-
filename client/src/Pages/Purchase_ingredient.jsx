import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, Drone, Ingredient, RestaurantSelect } from "../Components/Form";

function Purchase_ingredient() {
    
    const [ip_long_name, setIpLongName] = useState("");
    const [ip_id, setIpId] = useState("");
    const [ip_tag, setIpTag] = useState(-1);
    
    const [ip_barcode, setIpBarcode] = useState("");
    const [ip_quantity, setIpQuantity] = useState(0);
    const [notification, setNotification] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const colNames = ["Restaurant", "Delivery Service", "Drone Tag", "Ingredient", "Quantity"];
  
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
        if (ip_long_name.length < 1) {
          setNotification("Please Select a Restaurant");
        } else if (ip_id.length < 1) {
          setNotification("Please Select a Delivery Service");
        } else if (ip_tag < 0) {
          setNotification("Please Select a Drone");
        } else if (ip_barcode.length < 1) {
          setNotification("Please Select an Ingredient");
        } else if (ip_quantity < 1) {
          setNotification("You Must Purchase At Least 1 of The Item");
        } else {
          Axios.post("http://localhost:3001/purchase_ingredient" , {
            ip_long_name : ip_long_name,
            ip_id: ip_id,
            ip_tag: ip_tag,
            ip_barcode: ip_barcode,
            ip_quantity : ip_quantity
        }).then((res) => {
            setNotification(res.data.message)
        }); 
        }
        
    };

    const TableNames = ["Delivery Service ID", "Drone Tag", "Barcode", "Quantity", "Price"];

 
    return (
      <>
        <div className="App">
          
          <div className="information">
          <h1 >  Purchase Ingredient Procedure</h1>
          <h2>{notification}</h2>
            <label>{colNames[0]}:</label>
            <RestaurantSelect name="restaurant" onChange={(event) => {
                setIpLongName(event.target.value);
              }} />
            <label>{colNames[1]}:</label>
            <DeliveryService name="service" onChange={(event) => {
                setIpId(event.target.value);
              }} />
            <label>{colNames[2]}:</label>
            <Drone did={ip_id} name="drone" onChange={(event) => {
                setIpTag(parseInt(event.target.value));
              }} />
            <label>{colNames[3]}:</label>
            <Ingredient name="ingredient" onChange={(event) => {
                setIpBarcode(event.target.value);
              }} />
            <label>{colNames[4]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpQuantity(parseInt(event.target.value));
              }} min="1" step="1"
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
      <Table list={ingredients} colNames={TableNames} />
      </>
    );  
  }
  
export default Purchase_ingredient;
