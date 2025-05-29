import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import Navbar from "../../components/Navbar/Navbar";

const Home = ({ setShowLogin }) => {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Navbar
        setShowLogin={setShowLogin}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} searchTerm={searchTerm} />
      <AppDownload />
    </div>
  );
};

export default Home;
