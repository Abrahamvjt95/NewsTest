import React from "react";
import TopNav from "./topnav";
const NavBar = () => {
  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <TopNav />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
