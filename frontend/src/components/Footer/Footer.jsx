import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Tomato logo" />
          <p>
            Tomato is your trusted partner for fresh, delicious food delivered
            fast. We connect you with top local restaurants and chefs, offering
            a wide variety of cuisines and healthy options for every taste and
            lifestyle. Enjoy seamless ordering, real-time tracking, and
            exclusive deals every day!
          </p>
          <div className="footer-social-icons">
            <a href="#" aria-label="Facebook">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>1234 Market Street, Suite 500, San Francisco, CA 94103</li>
            <li>+1-415-555-1234</li>
            <li>support@tomatofood.com</li>
            <li>Mon - Sat: 8:00am - 10:00pm</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 © TomatoFood.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
