import React from "react";
// import Navbar from "./components/Navbar/Navbar";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import Menu from "./pages/Menu/Menu";
import FoodDetails from "./pages/FoodDetails/FoodDetails";
import { useState, useEffect } from "react";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );

  useEffect(() => {
    let interval;
    if (!isLoggedIn) {
      interval = setInterval(() => {
        setShowLogin(true);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLogin]);

  // When popup is closed (user logs in), update state
  const handleCloseLogin = (loggedIn = false) => {
    setShowLogin(false);
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  };

  return (
    <>
      {showLogin && !isLoggedIn ? (
        <LoginPopup setShowLogin={handleCloseLogin} />
      ) : null}
      <div className="app">
        {/* <Navbar setShowLogin={setShowLogin} /> */}
        <Routes>
          <Route path="/" element={<Home setShowLogin={setShowLogin} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="*" element={<Home setShowLogin={setShowLogin} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
