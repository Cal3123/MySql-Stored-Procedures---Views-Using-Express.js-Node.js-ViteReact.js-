import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Table from "../Components/Table/Table"

function Display_ingredient_view() {
    const [ingredientView, setIngredientView] = useState([]);
    const [notification, setNotification] = useState("");
    
    const getIngredients = () => {
      Axios.get("http://localhost:3001/display_ingredient_view").then((response) => {
        if(response.data.message === "Get Error") {
          setNotification("Get Error")
        } else {
            setIngredientView(response.data);
        }     
      });
    };
 
    return (
      <>
        <div className="App">
          <text >  Display Ingredient View </text>
          <h1>{notification}</h1>
          <div className="ingredients">
            <button onClick={getIngredients}>Show Ingredients View</button>
          </div>
      </div>
      <Table list={ingredientView}/>
      </>
    );  
  }
export default Display_ingredient_view;