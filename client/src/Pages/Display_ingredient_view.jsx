import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Display_ingredient_view() {
    const [ingredientView, setIngredientView] = useState([]);
    const [notification, setNotification] = useState("");
    
    const getIngredients = () => {
      Axios.get("http://localhost:3001/display_ingredient_view").then((response) => {
        if(response.message === "Get Error") {
          setNotification("Get Error")
        } else {
            setIngredientView(response.data);
        }     
      });
    };
 
    const TableNames = ["Ingredient Name", "Location", "Amount Available", "Lowest Price", "Highest Price"]
    return (
      <>
        <div className="App">
          <h1 >  Display Ingredient View </h1>
          <h2>{notification}</h2>
          <div className="ingredients">
            <button onClick={getIngredients}>Show Ingredients View</button>
          </div>
      </div>
      
      <Table list={ingredientView} colNames={TableNames}  />
      </>
    );  
  }
export default Display_ingredient_view;