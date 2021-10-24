import moment from "moment";
import React from "react";
import "./ResumeItem.css";

function ResumeItem({ dateStarted, dateEnded, title, subTitle, details }) {
  return (
    <div className="resumeItem">
      <div className="resumeItem__left">
        <h3>  {moment(dateStarted).format("ll")}</h3> -
        <h3>{moment(dateEnded).format("ll")}</h3>
      </div>
      <div className="resumeItem__right">
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
        <p>{details}</p>
      </div>
    </div>
  );
}

export default ResumeItem;
