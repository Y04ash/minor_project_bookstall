import React from "react";
import "../css/styles.css";


const Navbar = () => {
  return (
    // <div className="nav_outer">
      <nav className="nav">
        <div className="logo_title">
          <div className="logo"></div>
          <a href="/" className="site-title">
            Book Stock Pro
          </a>
        </div>
        <ul>
          <li className="tabs">
            <a href="/">Home</a>
          </li>
          <li className="tabs">
            <a href="/Campaign">Campaign</a>
          </li>
          <li className="tabs">
            <a href="/Add-campaign">Add Campaign</a>
          </li>
        </ul>
      </nav>
    // </div>
  );
};

export default Navbar;
