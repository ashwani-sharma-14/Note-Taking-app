import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sidebarStyle = {
    width: "250px",
    background: "#2C3E50",
    color: "#ECF0F1",
    padding: "20px",
    height: "100vh",
  };

  const navListStyle = {
    listStyle: "none",
    padding: 0,
    marginTop: "40px",
  };

  const linkStyle = {
    display: "block",
    color: "#ECF0F1",
    textDecoration: "none",
    padding: "10px 0",
    fontSize: "16px",
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={{ margin: 0, fontSize: "24px" }}>My Dashboard</h2>
      <ul style={navListStyle}>
        <li>
          <NavLink to="/dashboard" style={linkStyle}>
            Home
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
