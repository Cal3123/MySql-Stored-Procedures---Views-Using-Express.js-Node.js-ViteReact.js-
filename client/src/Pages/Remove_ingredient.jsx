import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"
import axios from "axios";
import { Ingredient } from "../Components/Form";

function Remove_ingredient() {
    const [notification, setNotification] = useState("");
    const [ip_barcode, setIpBarcode] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const colNames = ["Barcode", "Ingredient Name", "Weight"];
    
  
    const getIngredients = () => {
      Axios.get("http://localhost:3001/remove_ingredient").then((response) => {
        if(response.data.message === "Get Error") {
          setNotification("Get Error")
        } else {
          setIngredients(response.data);
        }
        
      });
    };
    const removeIngredient = () => {
      if (ip_barcode.length < 1) {
        setNotification("Please Select a Valid Ingredient");
      } else {
        axios.post("http://localhost:3001/remove_ingredient" , {
                
        ip_barcode : ip_barcode
        
      }).then((res) => {
          setNotification(res.data.message)
      });      
      }
    };

    const TableNames = ["Barcode", "Ingredient Name", "Weight"]
    return (
      <>
        <div className="App">
          
          <div className="information">
          <h1 >  Remove Ingredient Procedure</h1>
          <h2>{notification}</h2>
            <label>{colNames[0]}:</label>
            <Ingredient name="ingredient" onChange={(event) => {
                setIpBarcode(event.target.value);
              }} />
            <button onClick={removeIngredient}>Remove Ingredient</button>
          </div>
          <div className="ingredients">
            <button onClick={getIngredients}>Show/Refresh Ingredients</button>
              
          </div>
      </div>
      <Table list={ingredients} colNames={TableNames}/>
      </>
    );  
  }
  
export default Remove_ingredient;