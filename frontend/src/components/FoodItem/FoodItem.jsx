import React, { useRef } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    React.useContext(StoreContext);
  const cardRef = useRef(null);
  const addBtnRef = useRef(null);

  // Ripple effect handler
  const handleCardClick = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    const rect = card.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  // Add-to-cart bounce animation
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(id);
    if (addBtnRef.current) {
      addBtnRef.current.classList.remove("add-bounce");
      // Force reflow to restart animation
      void addBtnRef.current.offsetWidth;
      addBtnRef.current.classList.add("add-bounce");
    }
  };

  return (
    <div className="food-item" ref={cardRef} onClick={handleCardClick}>
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt=""
        />
        {!cartItems[id] ? (
          <img
            className="add"
            ref={addBtnRef}
            onClick={handleAddToCart}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(id);
              }}
              src={assets.remove_icon_red}
              alt=""
            />
          <p>{cartItems[id]}</p>
            <img
              ref={addBtnRef}
              onClick={handleAddToCart}
              src={assets.add_icon_green}
              alt=""
            />
        </div>
        )}
    </div>
    <div className="food-item-info">
      <div className="food-item-name-rating">
        <p>{name}</p>
        <img src={assets.rating_starts} alt="" />
      </div>
      <p className="food-item-desc">{description}</p>
      <p className="food-item-price">${price}</p>
    </div>
    </div>
  );
};
    
export default FoodItem;
