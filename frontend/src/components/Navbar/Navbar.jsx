import React, { useState, useContext, useRef } from "react";
import "./Navbar.css";
import { assets, menu_list } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin, setSearchTerm, searchTerm }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, food_list } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [highlighted, setHighlighted] = useState([-1, -1]); // [categoryIdx, itemIdx]
  const inputRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Group and filter food items by category and search term
  const groupedResults = menu_list
    .map((cat) => {
      const matches = food_list
        .filter(
          (item) =>
            item.category === cat.menu_name &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));
      return { category: cat.menu_name, items: matches };
    })
    .filter((group) => group.items.length > 0);

  // Flattened list for keyboard navigation
  const flatResults = groupedResults.flatMap((group, cIdx) =>
    group.items.map((item, iIdx) => ({ item, cIdx, iIdx }))
  );

  // Handle keyboard navigation and Enter
  const handleKeyDown = (e) => {
    if (!flatResults.length) return;
    let idx = flatResults.findIndex(
      (r) => r.cIdx === highlighted[0] && r.iIdx === highlighted[1]
    );
    if (e.key === "ArrowDown") {
      idx = (idx + 1) % flatResults.length;
      setHighlighted([flatResults[idx].cIdx, flatResults[idx].iIdx]);
    } else if (e.key === "ArrowUp") {
      idx = (idx - 1 + flatResults.length) % flatResults.length;
      setHighlighted([flatResults[idx].cIdx, flatResults[idx].iIdx]);
    } else if (e.key === "Enter") {
      if (idx >= 0 && flatResults[idx]) {
        navigate(`/food/${flatResults[idx].item._id}`);
        setShowSearch(false);
        setSearchTerm("");
      }
    }
  };

  // Handle click on result
  const handleResultClick = (item) => {
    navigate(`/food/${item._id}`);
    setShowSearch(false);
    setSearchTerm("");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img
          src={assets.search_icon}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowSearch((v) => !v);
            setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
          }}
        />
        {showSearch && (
          <div className="navbar-search-dropdown-container">
            <input
              ref={inputRef}
              className="navbar-search-input"
              type="text"
              placeholder="Search food..."
              value={searchTerm}
              autoFocus
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setHighlighted([-1, -1]);
              }}
              onBlur={() => setTimeout(() => setShowSearch(false), 150)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleKeyDown}
            />
            {searchTerm && groupedResults.length > 0 && (
              <ul className="navbar-search-dropdown">
                {groupedResults.map((group, cIdx) => (
                  <React.Fragment key={group.category}>
                    <li className="navbar-search-category">{group.category}</li>
                    {group.items.map((item, iIdx) => (
                      <li
                        key={item._id}
                        className={
                          highlighted[0] === cIdx && highlighted[1] === iIdx
                            ? "highlighted"
                            : ""
                        }
                        onMouseDown={() => handleResultClick(item)}
                        onMouseEnter={() => setHighlighted([cIdx, iIdx])}
                      >
                        {item.name}
                      </li>
                    ))}
                  </React.Fragment>
                ))}
              </ul>
            )}
            {searchTerm && groupedResults.length === 0 && (
              <div className="navbar-search-noresult">No results found</div>
            )}
          </div>
        )}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
