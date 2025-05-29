import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./FoodDetails.css";
import { assets } from "../../assets/assets";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { food_list, addToCart, removeFromCart, cartItems, url } =
    useContext(StoreContext);
  const food = food_list.find((item) => item._id === id);
  const quantity = cartItems[food?._id] || 0;

  if (!food) {
    return <div className="food-details-loading">Loading...</div>;
  }

  return (
    <div className="food-details-bg">
      <div className="food-details-card animate-in">
        <button className="food-details-close" onClick={() => navigate(-1)}>
          &times;
        </button>
        <div className="food-details-img-wrap">
          <img
            src={url + "/images/" + food.image}
            alt={food.name}
            className="food-details-img"
          />
        </div>
        <div className="food-details-info">
          <h2>{food.name}</h2>
          <p className="food-details-desc">{food.description}</p>
          <div className="food-details-price-row">
            <span className="food-details-price">${food.price}</span>
            <div className="food-details-cart-actions">
              <button
                className="food-details-remove"
                onClick={() => removeFromCart(food._id)}
                disabled={quantity === 0}
              >
                Remove
              </button>
              <span className="food-details-quantity">{quantity}</span>
              <button
                className="food-details-add"
                onClick={() => addToCart(food._id)}
              >
                {quantity ? "Add More" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
