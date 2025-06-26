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
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setMenu("menu");
            document
              .getElementById("explore-menu")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setMenu("mobile-app");
            document
              .getElementById("app-download")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setMenu("contact-us");
            document
              .getElementById("footer")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
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
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-link"
          aria-label="Admin Panel"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7.43-2.06c.04-.3.07-.61.07-.94s-.03-.64-.07-.94l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.03 7.03 0 0 0-1.62-.94l-.38-2.65A.5.5 0 0 0 14 2h-4a.5.5 0 0 0-.5.42l-.38 2.65c-.59.22-1.14.52-1.62.94l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64l2.11 1.65c-.04.3-.07.61-.07.94s.03.64.07.94l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .6.22l2.49-1c.48.42 1.03.77 1.62.94l.38 2.65A.5.5 0 0 0 10 22h4a.5.5 0 0 0 .5-.42l.38-2.65c.59-.22 1.14-.52 1.62-.94l2.49 1a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.12-.64l-2.11-1.65zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
