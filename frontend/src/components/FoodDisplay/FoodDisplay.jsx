import React, { useContext } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  
  
  const updatedList = food_list.filter((item) => category === "All" || category === item.category);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {updatedList.length > 0 ? (
          updatedList.map((item) => (
            <FoodItem
              key={item._id}
              image={item.image}
              name={item.name}
              desc={item.description}
              price={item.price}
              id={item._id}
            />
          ))
        ) : (
          
          <h2 style={{textAlign:"center", border:"2px solid black"}}>Food is awaited</h2>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
