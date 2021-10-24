import React from "react";
import "./Title.css";

function Title({ title, span }) {
  return (
    <div className="title">
      <h2 className='title__heading'>
        {title} <span>{span}</span>
      </h2>
    </div>
  );
}

export default Title;
