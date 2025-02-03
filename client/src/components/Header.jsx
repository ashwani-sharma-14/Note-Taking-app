import React from "react";

const Header = ({ onLogout, username }) => {
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "10px 20px",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
  };

  const userInfoStyle = {
    display: "flex",
    alignItems: "center",
  };

  const usernameStyle = {
    fontWeight: 500,
    marginRight: "10px",
  };

  const logoutButtonStyle = {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={headerStyle}>
      <h1 style={{ margin: 0, fontSize: "24px" }}>Dashboard</h1>
      <div style={userInfoStyle}>
        <span style={usernameStyle}>{username}</span>
        <button style={logoutButtonStyle} onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
