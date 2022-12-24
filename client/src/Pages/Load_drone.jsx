import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import { DeliveryService, Drone, Ingredient, UsernameSelect } from "../Components/Form";

function Load_drone() {
  const [ip_id, setId] = useState("");
  const [ip_tag, setTag] = useState(-1);
  const [ip_barcode, setBarcode] = useState("");
  const [packageCount, setPackageCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [loads, setLoads] = useState([]);
  const [notification, setNotification] = useState("");

  const loadDrone = () => {
    if (ip_id.length < 1) {
        setNotification("Please Select a Delivery Service");
    } else if (ip_tag < 0) {
        setNotification("Please Select a Drone");
    } else if (ip_barcode.length < 1) {
        setNotification("Please Select an Ingredient");
    } else if (packageCount < 1) {
        setNotification("Unable to Load Empty Package");
    } else if (price < 0) {
        setNotification("Unable to Load Items With Negative Price");
    } else {
        Axios.post("http://localhost:3001/load_drone", {
          ip_id: ip_id,
          ip_tag: ip_tag,
          ip_barcode: ip_barcode,
          ip_more_packages: packageCount,
          ip_price: price
        }).then((res) => {
            setNotification(res.data.message)
        });
    }
  };

  const getLoads = () => {
    Axios.get("http://localhost:3001/load_drone").then((response) => {
      if(response.data.message === "Get Error") {
        setNotification("Get Error")
      } else {
        setLoads(response.data);
      }
      
    });
  };

  const colNames = ["Delivery Service", "Drone Tag", "Item Barcode", "Additional Package Count", "Price"];
 const TableNames = ["Delivery Service ID", "Drone Tag", "Barcode", "Quantity", "Price"];
  return (
    <>
      <div className="App">
        <div className="information">
        <h1>Load Drone</h1>
          <h2>{notification}</h2>
          <label>{colNames[0]}:</label>
          <DeliveryService name="service" onChange={(event) => {setId(event.target.value); setTag(-1);}} />
          <label>{colNames[1]}:</label>
          <Drone name="drone" did={ip_id} onChange={(event) => {setTag(parseInt(event.target.value));}} />
          <label>{colNames[2]}:</label>
            <Ingredient name="ingredient" onChange={(event) => {setBarcode(event.target.value);}} />
          <label>{colNames[3]}:</label>
          <input type="number" min="1" step="1" placeholder="Package Count" onChange={(event) => {setPackageCount(parseInt(event.target.value));}} />
          <label>{colNames[4]}:</label>
          <input type="number" min="0" placeholder="Price" step="1" onChange={(event) => {setPrice(parseInt(event.target.value));}} />
          <button onClick={loadDrone}>Load Drone</button>
          <button onClick={getLoads}>View Loads</button>
        </div>
    </div>
    <Table list={loads} colNames={TableNames}/>
    </>
  );  
}

export default Load_drone;