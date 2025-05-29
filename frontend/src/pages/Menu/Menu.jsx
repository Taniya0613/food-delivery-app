import React, { useContext } from "react";
import "./Menu.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../../components/FoodItem/FoodItem";

const Menu = () => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>
          Discover our delicious selection of dishes, crafted with the freshest
          ingredients and culinary expertise.
        </p>
      </div>
      <div className="menu-list">
        {food_list.length === 0 ? (
          <div className="menu-loading">Loading menu...</div>
        ) : (
          food_list.map((item) => (
            <div className="menu-fade-in" key={item._id}>
              <FoodItem
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;
