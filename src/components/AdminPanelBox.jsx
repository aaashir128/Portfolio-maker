import React from "react";
import "./AdminPanelBox.css";

function AdminPanelBox({ image, title, details }) {
  return (
    <div className="adminPanelBox">
      <div className="adminPanelBox__image">
        <img src={image} />
      </div>
      <h4>{title}</h4>
      <p>{details}</p>
    </div>
  );
}

export default AdminPanelBox;
