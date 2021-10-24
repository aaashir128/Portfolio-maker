import React from "react";
import "./ServiceCard.css";

function ServiceCard({ image, title, details }) {
  return (
    <div className="serviceCard">
      <div className="serviceCard__image">
        <img src={image} />
      </div>
      <h4>{title}</h4>
      <p>{details}</p>
    </div>
  );
}

export default ServiceCard;
