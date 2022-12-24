import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Add_ingredient() {
    const [ip_barcode, setIpBarcode] = useState("");
    const [ip_iname, setIpIname] = useState("");
    const [ip_weight, setIpWeight] = useState(0);
    const [notification, setNotification] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const TableNames = ["Barcode", "Ingredient Name", "Weight"];



    
    const addIngredient = () => {
      if (ip_barcode.length < 1) {
        setNotification("Please Specify a Barcode");
      } else if (ip_iname.length < 1) {
        setNotification("Please Specify an Ingredient Name");
      } else if (ip_weight < 1) {
        setNotification("Ingredients Must Have Weight");
      } else {
        Axios.post("http://localhost:3001/add_ingredient", {
          ip_barcode : ip_barcode,
          ip_iname : ip_iname,
          ip_weight : ip_weight
        }).then((res) => {
            setNotification(res.data.message)
        });
      }
    };
  
    const getIngredients = () => {
      Axios.get("http://localhost:3001/add_ingredient").then((response) => {
        if(response.data.message === "Get Error") {
            setNotification("Get Error")
          } else {
            setIngredients(response.data);
          }  
      });
    };
  
    return (
      <>
        <div className="App">
          <h1 > Ingredients </h1>
          <h2>{notification}</h2>
          <div className="information">
            <label>{TableNames[0]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpBarcode(event.target.value);
              }} minLength="0" maxLength="40"
            />
            <label>{TableNames[1]}:</label>
            <input
              type="text"
              onChange={(event) => {
                setIpIname(event.target.value);
              }} minLength="0" maxLength="100"
            />
            <label>{TableNames[2]}:</label>
            <input
              type="number"
              onChange={(event) => {
                setIpWeight(event.target.value);
              }} min="0" step="1"
            />
            <button onClick={addIngredient}>Add Ingredient</button>
          </div>
          <div className="ingredients">
            <button onClick={getIngredients}>Show Ingredients</button>
          </div>
      </div>
      <Table list={ingredients} colNames={TableNames}/>
      </>
    );  
  }
export default Add_ingredient;